import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  getDocs, 
  addDoc, 
  deleteDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Table, Order, MenuItem, OrderItem } from '@/types';

// Collections
export const COLLECTIONS = {
  TABLES: 'tables',
  ORDERS: 'orders',
  MENU_ITEMS: 'menuItems',
  ORDER_ITEMS: 'orderItems'
} as const;

// Table Management
export const initializeTables = async () => {
  try {
    const tablesRef = collection(db, COLLECTIONS.TABLES);
    const snapshot = await getDocs(tablesRef);
    
    // If no tables exist, create initial 24 tables
    if (snapshot.empty) {
      for (let i = 1; i <= 24; i++) {
        await setDoc(doc(db, COLLECTIONS.TABLES, i.toString()), {
          id: i,
          number: i,
          status: 'available',
          capacity: Math.floor(Math.random() * 6) + 2,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    }
  } catch (error) {
    console.error('Error initializing tables:', error);
  }
};

export const subscribeToTables = (callback: (tables: Table[]) => void) => {
  const tablesRef = collection(db, COLLECTIONS.TABLES);
  const q = query(tablesRef, orderBy('number'));
  
  return onSnapshot(q, (snapshot) => {
    const tables: Table[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data) {
        tables.push({ ...data, id: doc.id } as unknown as Table);
      }
    });
    callback(tables);
  });
};

export const updateTableStatus = async (tableId: string, status: Table['status']) => {
  try {
    const tableRef = doc(db, COLLECTIONS.TABLES, tableId);
    await updateDoc(tableRef, {
      status,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating table status:', error);
    throw error;
  }
};

// Order Management
export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const orderRef = await addDoc(collection(db, COLLECTIONS.ORDERS), {
      ...order,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return orderRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrder = async (orderId: string, updates: Partial<Order>) => {
  try {
    const orderRef = doc(db, COLLECTIONS.ORDERS, orderId);
    await updateDoc(orderRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

export const subscribeToTableOrders = (tableId: number, callback: (orders: Order[]) => void) => {
  const ordersRef = collection(db, COLLECTIONS.ORDERS);
  const q = query(
    ordersRef,
    where('tableId', '==', tableId),
    where('status', 'in', ['active', 'hold']),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const orders: Order[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data) {
        orders.push({
          ...data,
          id: doc.id,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as unknown as Order);
      }
    });
    callback(orders);
  });
};

// Menu Items Management
export const initializeMenuItems = async () => {
  try {
    const menuRef = collection(db, COLLECTIONS.MENU_ITEMS);
    const snapshot = await getDocs(menuRef);
    
    // If no menu items exist, create initial menu
    if (snapshot.empty) {
      const initialMenuItems: Omit<MenuItem, 'id'>[] = [
        { name: 'Aalu Paratha', price: 55.50, category: 'food', available: true },
        { name: 'Mix Paratha Chat', price: 105.00, category: 'food', available: true },
        { name: 'Aloo Tikki', price: 95.50, category: 'fast-food', available: true },
        { name: 'Bhelpuri', price: 135.00, category: 'fast-food', available: true },
        { name: 'Dosa', price: 125.00, category: 'food', available: true },
        { name: 'Chili Kebab', price: 55.50, category: 'chinese', available: true },
        { name: 'Chicken Biryani', price: 157.50, category: 'food', available: true },
        { name: 'Chow Mein', price: 157.50, category: 'chinese', available: true },
        { name: 'Club Sandwich', price: 85.50, category: 'fast-food', available: true },
        { name: 'Gulab Jamun', price: 55.50, category: 'sweet', available: true },
        { name: 'Dahi Papdi Chat', price: 105.00, category: 'fast-food', available: true },
        { name: 'Dal Vada', price: 56.70, category: 'food', available: true },
        { name: 'Double Roti Egg', price: 87.50, category: 'food', available: true },
        { name: 'Farmhouse Pizza', price: 336.00, category: 'fast-food', available: true },
        { name: 'Fried Rice', price: 147.60, category: 'chinese', available: true }
      ];

      for (const item of initialMenuItems) {
        await addDoc(menuRef, {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    }
  } catch (error) {
    console.error('Error initializing menu items:', error);
  }
};

export const subscribeToMenuItems = (callback: (menuItems: MenuItem[]) => void) => {
  const menuRef = collection(db, COLLECTIONS.MENU_ITEMS);
  // Simple query without any ordering to avoid index requirements
  
  return onSnapshot(menuRef, (snapshot) => {
    const menuItems: MenuItem[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data) {
        const menuItem = data as unknown as MenuItem;
        // Filter available items on client side
        if (menuItem.available) {
          menuItems.push({ ...menuItem, id: doc.id });
        }
      }
    });
    // Sort by name on client side
    menuItems.sort((a, b) => a.name.localeCompare(b.name));
    callback(menuItems);
  });
};

// Admin Menu Management Functions
export const addMenuItem = async (menuItem: Omit<MenuItem, 'id'>) => {
  try {
    const menuRef = collection(db, COLLECTIONS.MENU_ITEMS);
    const docRef = await addDoc(menuRef, {
      ...menuItem,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding menu item:', error);
    throw error;
  }
};

export const updateMenuItem = async (itemId: string, updates: Partial<MenuItem>) => {
  try {
    const itemRef = doc(db, COLLECTIONS.MENU_ITEMS, itemId);
    await updateDoc(itemRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

export const deleteMenuItem = async (itemId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.MENU_ITEMS, itemId));
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

export const subscribeToAllMenuItems = (callback: (menuItems: MenuItem[]) => void) => {
  const menuRef = collection(db, COLLECTIONS.MENU_ITEMS);
  // Simple query to get all menu items
  
  return onSnapshot(menuRef, (snapshot) => {
    const menuItems: MenuItem[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data) {
        menuItems.push({ ...data, id: doc.id } as unknown as MenuItem);
      }
    });
    // Sort by name on client side
    menuItems.sort((a, b) => a.name.localeCompare(b.name));
    callback(menuItems);
  });
};

// Order Items Management
export const addOrderItem = async (orderItem: Omit<OrderItem, 'id'> & { orderId: string }) => {
  try {
    await addDoc(collection(db, COLLECTIONS.ORDER_ITEMS), {
      ...orderItem,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding order item:', error);
    throw error;
  }
};

export const updateOrderItem = async (itemId: string, updates: Partial<OrderItem>) => {
  try {
    const itemRef = doc(db, COLLECTIONS.ORDER_ITEMS, itemId);
    await updateDoc(itemRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating order item:', error);
    throw error;
  }
};

export const deleteOrderItem = async (itemId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.ORDER_ITEMS, itemId));
  } catch (error) {
    console.error('Error deleting order item:', error);
    throw error;
  }
};

export const subscribeToOrderItems = (orderId: string, callback: (items: OrderItem[]) => void) => {
  const itemsRef = collection(db, COLLECTIONS.ORDER_ITEMS);
  const q = query(itemsRef, where('orderId', '==', orderId), orderBy('createdAt'));
  
  return onSnapshot(q, (snapshot) => {
    const items: OrderItem[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data) {
        items.push({ ...data, id: doc.id } as unknown as OrderItem);
      }
    });
    callback(items);
  });
};