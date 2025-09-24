'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem } from '@/types';
import { createOrder, updateOrder } from '@/lib/firestore';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  total: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableNumber: number;
  waiterName: string;
  waiterId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  timestamp: Date;
  notes?: string;
  paymentMethod?: 'cash' | 'card' | 'upi';
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'timestamp'>) => Promise<string>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  updateOrderPayment: (orderId: string, paymentMethod: 'cash' | 'upi') => void;
  getOrdersByStatus: (status: Order['status']) => Order[];
  getTodaysOrders: () => Order[];
  getTodaysRevenue: () => number;
  getOrdersByWaiter: (waiterId: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth(); // Get authentication state

  // Helper function to map Firebase status back to our status values
  const mapStatusFromFirebase = (firebaseStatus: string): Order['status'] => {
    const statusMap: Record<string, Order['status']> = {
      'active': 'preparing',
      'hold': 'pending',
      'completed': 'completed',
      'cancelled': 'cancelled'
    };
    return statusMap[firebaseStatus] || 'pending';
  };

  // Helper function to remove duplicate orders by ID
  const deduplicateOrders = (orders: Order[]): Order[] => {
    const seen = new Set();
    return orders.filter(order => {
      if (seen.has(order.id)) {
        console.log('🟡 REMOVING DUPLICATE ORDER:', order.id);
        return false;
      }
      seen.add(order.id);
      return true;
    });
  };

  // Load orders from localStorage first, then Firestore when authenticated
  useEffect(() => {
    const loadOrdersFromLocalStorage = () => {
      console.log('🟠 LOADING ORDERS FROM LOCALSTORAGE...');
      const savedOrders = localStorage.getItem('restaurant-orders');
      console.log('🟠 Raw localStorage data:', savedOrders);
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          timestamp: new Date(order.timestamp)
        }));
        console.log('🟠 PARSED ORDERS FROM LOCALSTORAGE:', parsedOrders.length, 'orders');
        console.log('🟠 Orders loaded:', parsedOrders.map((o: { id: any; tableNumber: any; status: any; }) => ({ id: o.id, table: o.tableNumber, status: o.status })));
        const uniqueOrders = deduplicateOrders(parsedOrders);
        setOrders(uniqueOrders);
      } else {
        console.log('🟠 NO ORDERS FOUND IN LOCALSTORAGE');
      }
    };

    // Always load from localStorage first (works offline)
    loadOrdersFromLocalStorage();

    // Only subscribe to Firestore if user is authenticated
    let unsubscribe: (() => void) | undefined;

    if (user) {
      console.log('🔥 USER AUTHENTICATED - SUBSCRIBING TO FIRESTORE ORDERS...');
      const ordersRef = collection(db, 'orders');
      const q = query(ordersRef, orderBy('createdAt', 'desc'));

      unsubscribe = onSnapshot(q,
        (snapshot) => {
          const firestoreOrders: Order[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data) {
              // Transform Firebase Order format to our OrderContext format
              const transformedOrder: Order = {
                id: doc.id,
                tableNumber: data.tableId || 0, // Map tableId back to tableNumber
                waiterName: 'Waiter', // Default value
                waiterId: data.waiterId || 'unknown',
                items: data.items || [],
                total: data.total || 0,
                status: mapStatusFromFirebase(data.status), // Map status back
                timestamp: data.createdAt?.toDate() || new Date(),
                notes: data.notes || '',
                paymentMethod: data.paymentMethod || 'cash'
              };
              firestoreOrders.push(transformedOrder);
            }
          });
          console.log('🔥 FIRESTORE ORDERS UPDATED:', firestoreOrders.length, 'orders');

          // Use Firebase as the source of truth, replace all orders
          const uniqueFirestoreOrders = deduplicateOrders(firestoreOrders);
          setOrders(uniqueFirestoreOrders);

          // Also sync to localStorage
          localStorage.setItem('restaurant-orders', JSON.stringify(firestoreOrders));
        },
        (error) => {
          console.error('🔥 FIRESTORE PERMISSION ERROR:', error);
          console.log('🔥 FALLING BACK TO LOCALSTORAGE ONLY');
          // Keep using localStorage data if Firestore fails
        }
      );
    } else {
      console.log('🔥 USER NOT AUTHENTICATED - USING LOCALSTORAGE ONLY');
    }

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      console.log('🟣 STORAGE EVENT DETECTED:', e.key);
      if (e.key === 'restaurant-orders' && e.newValue) {
        console.log('🟣 NEW ORDERS DATA FROM STORAGE EVENT:', e.newValue);
        const parsedOrders = JSON.parse(e.newValue).map((order: any) => ({
          ...order,
          timestamp: new Date(order.timestamp)
        }));
        console.log('🟣 UPDATING ORDERS FROM STORAGE EVENT:', parsedOrders.length, 'orders');
        setOrders(parsedOrders);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (unsubscribe) {
        unsubscribe(); // Unsubscribe from Firestore if it was subscribed
      }
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]); // Re-run when user authentication state changes

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('restaurant-orders', JSON.stringify(orders));
      console.log('🟢 ORDERS SAVED TO LOCALSTORAGE:', orders.length, 'orders');
    }
  }, [orders]);

  const addOrder = async (orderData: Omit<Order, 'id' | 'timestamp'>): Promise<string> => {
    console.log('🟢 ADDING NEW ORDER TO CONTEXT:', orderData);
    console.log('🟢 Order items in new order:', orderData.items);

    // Check if user is authenticated before trying to save to Firebase
    if (!user) {
      console.log('🔥 USER NOT AUTHENTICATED - SAVING TO LOCALSTORAGE ONLY');
      const newOrder: Order = {
        ...orderData,
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        timestamp: new Date(),
        status: orderData.status || 'pending'
      };

      setOrders(prev => {
        const updatedOrders = [newOrder, ...prev];
        return deduplicateOrders(updatedOrders);
      });

      return newOrder.id;
    }

    try {
      // Transform our OrderContext data format to Firebase Order format
      const firebaseOrderData = {
        tableId: orderData.tableNumber, // Map tableNumber to tableId
        items: orderData.items.map(item => ({
          id: item.id,
          menuItem: {
            id: item.menuItem.id,
            name: item.menuItem.name,
            price: item.menuItem.price,
            category: item.menuItem.category,
            available: item.menuItem.available
          },
          quantity: item.quantity,
          total: item.total,
          notes: item.notes || ''
        })),
        status: mapStatusToFirebase(orderData.status), // Map status values
        total: orderData.total,
        waiterId: orderData.waiterId
      };

      console.log('🔥 TRANSFORMED DATA FOR FIREBASE:', firebaseOrderData);

      // Filter out any undefined values
      const cleanData = removeUndefinedFields(firebaseOrderData);
      console.log('🔥 CLEAN DATA FOR FIREBASE:', cleanData);

      const orderId = await createOrder(cleanData as any);

      console.log('🔥 ORDER SAVED TO FIREBASE WITH ID:', orderId);

      // Don't add to local state here - the onSnapshot listener will handle it
      // This prevents duplicates from Firebase and local state

      return orderId;
    } catch (error) {
      console.error('🔥 ERROR SAVING TO FIREBASE:', error);

      // Fallback to localStorage only if Firebase fails
      const newOrder: Order = {
        ...orderData,
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
        timestamp: new Date(),
        status: orderData.status || 'pending'
      };

      setOrders(prev => {
        const updatedOrders = [newOrder, ...prev];
        console.log('🟢 FALLBACK: UPDATED ORDERS ARRAY:', updatedOrders.length, 'total orders');
        return deduplicateOrders(updatedOrders);
      });

      return newOrder.id;
    }
  };

  // Helper function to map our status values to Firebase status values
  const mapStatusToFirebase = (status: Order['status']) => {
    const statusMap: Record<Order['status'], 'active' | 'hold' | 'completed' | 'cancelled'> = {
      'pending': 'active',
      'preparing': 'active',
      'ready': 'active',
      'served': 'completed',
      'completed': 'completed',
      'cancelled': 'cancelled'
    };
    return statusMap[status] || 'active';
  };

  // Helper function to remove undefined fields
  const removeUndefinedFields = (obj: any): any => {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
          cleaned[key] = removeUndefinedFields(value);
        } else if (Array.isArray(value)) {
          cleaned[key] = value.map(item =>
            typeof item === 'object' ? removeUndefinedFields(item) : item
          );
        } else {
          cleaned[key] = value;
        }
      }
    }
    return cleaned;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    // Only update Firebase if user is authenticated
    if (!user) {
      console.log('🔥 USER NOT AUTHENTICATED - LOCAL UPDATE ONLY');
      // Update locally only when not authenticated
      setOrders(prev => {
        const updatedOrders = prev.map(order =>
          order.id === orderId ? { ...order, status } : order
        );
        return deduplicateOrders(updatedOrders);
      });
      return;
    }

    try {
      console.log('🔥 UPDATING ORDER STATUS IN FIREBASE:', orderId, status);
      const firebaseStatus = mapStatusToFirebase(status);
      await updateOrder(orderId, { status: firebaseStatus });
      console.log('🔥 ORDER STATUS UPDATED IN FIREBASE');
      // Don't update locally - the onSnapshot listener will handle it
    } catch (error) {
      console.error('🔥 ERROR UPDATING ORDER STATUS IN FIREBASE:', error);
      // Fallback to local update if Firebase fails
      setOrders(prev => {
        const updatedOrders = prev.map(order =>
          order.id === orderId ? { ...order, status } : order
        );
        return deduplicateOrders(updatedOrders);
      });
    }
  };

  const updateOrderPayment = (orderId: string, paymentMethod: 'cash' | 'upi') => {
    setOrders(prev => {
      const updatedOrders = prev.map(order =>
        order.id === orderId
          ? { ...order, paymentMethod, status: 'completed' as Order['status'] }
          : order
      );
      return deduplicateOrders(updatedOrders);
    });
    console.log(`💳 Payment method updated for order ${orderId}: ${paymentMethod}`);
  };

  const getOrdersByStatus = (status: Order['status']): Order[] => {
    return orders.filter(order => order.status === status);
  };

  const getTodaysOrders = (): Order[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return orders.filter(order => {
      const orderDate = new Date(order.timestamp);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });
  };

  const getTodaysRevenue = (): number => {
    const todaysCompletedOrders = getTodaysOrders().filter(
      order => order.status === 'completed'
    );
    return todaysCompletedOrders.reduce((sum, order) => sum + order.total, 0);
  };

  const getOrdersByWaiter = (waiterId: string): Order[] => {
    return orders.filter(order => order.waiterId === waiterId);
  };

  const contextValue: OrderContextType = {
    orders,
    addOrder,
    updateOrderStatus,
    updateOrderPayment,
    getOrdersByStatus,
    getTodaysOrders,
    getTodaysRevenue,
    getOrdersByWaiter
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};