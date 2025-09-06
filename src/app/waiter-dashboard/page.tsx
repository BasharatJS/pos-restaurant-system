'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Table, MenuItem, OrderItem, Order, MenuCategory } from '@/types';
import { 
  subscribeToTables, 
  subscribeToMenuItems, 
  initializeTables, 
  initializeMenuItems,
  updateTableStatus,
  createOrder
} from '@/lib/firestore';

const TableGrid = ({ tables, onTableSelect, selectedTable }: {
  tables: Table[];
  onTableSelect: (table: Table) => void;
  selectedTable: Table | null;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'table-available bg-green-500';
      case 'occupied': return 'table-occupied bg-yellow-500';
      case 'reserved': return 'table-reserved bg-blue-500';
      case 'billing': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4 p-6">
      {tables.map((table) => (
        <button
          key={table.id}
          onClick={() => onTableSelect(table)}
          className={`
            ${getStatusColor(table.status)} 
            ${selectedTable?.id === table.id ? 'ring-4 ring-white' : ''}
            text-white font-semibold py-8 px-4 rounded-lg shadow-lg hover:opacity-80 transition-all
            flex flex-col items-center justify-center min-h-24
          `}
        >
          <span className="text-2xl font-bold">{table.number}</span>
          <span className="text-xs mt-1 capitalize">{table.status}</span>
        </button>
      ))}
    </div>
  );
};

const MenuSidebar = ({ categories, selectedCategory, onCategorySelect }: {
  categories: MenuCategory[];
  selectedCategory: MenuCategory;
  onCategorySelect: (category: MenuCategory) => void;
}) => {
  const getCategoryName = (category: MenuCategory) => {
    switch (category) {
      case 'all': return 'All';
      case 'food': return 'Food';
      case 'fast-food': return 'Fast Food';
      case 'sweet': return 'Sweet';
      case 'chinese': return 'Chinese';
      case 'popular': return 'Popular';
      default: return category;
    }
  };

  return (
    <div className="w-48 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-4 sidebar-text">MENU CATEGORIES</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`
                w-full text-left px-3 py-2 rounded-lg transition-colors font-medium
                ${selectedCategory === category 
                  ? 'bg-green-500 text-white' 
                  : 'hover:bg-gray-100 text-gray-800 sidebar-text'
                }
              `}
              style={selectedCategory !== category ? { color: '#374151' } : {}}
            >
              {getCategoryName(category)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuGrid = ({ menuItems, onItemAdd }: {
  menuItems: MenuItem[];
  onItemAdd: (item: MenuItem) => void;
}) => {
  const getItemColor = (index: number) => {
    const colors = [
      'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500',
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-5 gap-4">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => onItemAdd(item)}
            className={`
              ${getItemColor(index)}
              text-white font-semibold py-6 px-4 rounded-lg shadow-lg hover:opacity-80 transition-all
              flex flex-col items-center justify-center min-h-32 menu-item-text
            `}
          >
            <span className="text-lg font-bold text-center menu-item-text">{item.name}</span>
            <span className="text-sm mt-2 menu-item-text">₹{item.price}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const OrderSummary = ({ orderItems, onQuantityChange, onRemoveItem, onKOT, onCheckout }: {
  orderItems: OrderItem[];
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onKOT: () => void;
  onCheckout: () => void;
}) => {
  const total = orderItems.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="w-80 bg-white border-l border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800 sidebar-text">ORDER SUMMARY</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {orderItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-8 sidebar-text">No items selected</p>
        ) : (
          <div className="space-y-3">
            {orderItems.map((item) => (
              <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm sidebar-text text-gray-800">{item.menuItem.name}</span>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 sidebar-text">₹{item.menuItem.price}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                      className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-800"
                    >
                      -
                    </button>
                    <span className="w-8 text-center sidebar-text text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right mt-1">
                  <span className="font-semibold sidebar-text text-gray-800">₹{item.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {orderItems.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onKOT}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              KOT
            </button>
            <button
              onClick={onCheckout}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// KOT Modal Component
const KOTModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  orderItems, 
  tableNumber,
  waiterName 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void;
  orderItems: OrderItem[];
  tableNumber: number;
  waiterName: string;
}) => {
  if (!isOpen) return null;

  const total = orderItems.reduce((sum, item) => sum + item.total, 0);
  const kotNumber = `KOT-${Date.now().toString().slice(-6)}`;
  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold">🍽️ KITCHEN ORDER TICKET</h2>
            <p className="text-blue-100 mt-1">Ready for Kitchen</p>
          </div>
        </div>

        {/* KOT Details */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">KOT Number</p>
                <p className="font-semibold text-blue-600">{kotNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Table</p>
                <p className="font-semibold">Table {tableNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Waiter</p>
                <p className="font-semibold">{waiterName}</p>
              </div>
              <div>
                <p className="text-gray-600">Time</p>
                <p className="font-semibold">{currentTime}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Details</h3>
            <div className="space-y-2">
              {orderItems.map((item, index) => (
                <div key={item.id} className="bg-white border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                          {index + 1}
                        </span>
                        <p className="font-semibold text-gray-800">{item.menuItem.name}</p>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 capitalize">
                        Category: {item.menuItem.category.replace('-', ' ')}
                      </p>
                      {item.notes && (
                        <p className="text-sm text-orange-600 mt-1 italic">
                          Note: {item.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-blue-600">×{item.quantity}</p>
                      <p className="text-sm text-gray-600">₹{item.menuItem.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {orderItems.length} item{orderItems.length > 1 ? 's' : ''}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V9a2 2 0 00-2-2H9a2 2 0 00-2 2v.01M15 15v.01"/>
              </svg>
              <span>Confirm & Print KOT</span>
            </button>
          </div>

          {/* Print Notice */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 text-yellow-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              <p className="text-sm font-medium">
                This KOT will be printed at the kitchen printer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function WaiterDashboard() {
  const { user, logout } = useAuth();
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  // Store orders for each table
  const [tableOrders, setTableOrders] = useState<Record<number, OrderItem[]>>({});
  const [showKOTModal, setShowKOTModal] = useState(false);

  // Initialize with default data immediately
  const [tables, setTables] = useState<Table[]>(
    Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      number: i + 1,
      status: 'available' as const,
      capacity: Math.floor(Math.random() * 6) + 2,
    }))
  );
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Aalu Paratha', price: 55.50, category: 'food', available: true },
    { id: '2', name: 'Mix Paratha Chat', price: 105.00, category: 'food', available: true },
    { id: '3', name: 'Aloo Tikki', price: 95.50, category: 'fast-food', available: true },
    { id: '4', name: 'Bhelpuri', price: 135.00, category: 'fast-food', available: true },
    { id: '5', name: 'Dosa', price: 125.00, category: 'food', available: true },
    { id: '6', name: 'Chili Kebab', price: 55.50, category: 'chinese', available: true },
    { id: '7', name: 'Chicken Biryani', price: 157.50, category: 'food', available: true },
    { id: '8', name: 'Chow Mein', price: 157.50, category: 'chinese', available: true },
    { id: '9', name: 'Club Sandwich', price: 85.50, category: 'fast-food', available: true },
    { id: '10', name: 'Gulab Jamun', price: 55.50, category: 'sweet', available: true },
  ]);
  
  const [isInitializing, setIsInitializing] = useState(false);

  // Initialize Firestore connection
  useEffect(() => {
    if (!user) return;
    console.log('User logged in, dashboard ready');
    
    const initializeFirestore = async () => {
      try {
        await initializeTables();
        await initializeMenuItems();
        const unsubscribeTables = subscribeToTables(setTables);
        const unsubscribeMenuItems = subscribeToMenuItems(setMenuItems);
        return () => {
          unsubscribeTables();
          unsubscribeMenuItems();
        };
      } catch (error) {
        console.error('Firestore initialization failed:', error);
      }
    };
    initializeFirestore();
  }, [user]);

  const categories: MenuCategory[] = ['all', 'food', 'fast-food', 'sweet', 'chinese', 'popular'];

  const filteredMenuItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleTableSelect = (table: Table) => {
    console.log('Table selected:', table);
    // Update table status to occupied when selected (local state for now)
    if (table.status === 'available') {
      setTables(prevTables => 
        prevTables.map(t => 
          t.id === table.id ? { ...t, status: 'occupied' as const } : t
        )
      );
    }
    setSelectedTable(table);
    // Load existing orders for this table or initialize empty array
    const existingOrders = tableOrders[table.id] || [];
    setOrderItems(existingOrders);
  };

  const handleItemAdd = (menuItem: MenuItem) => {
    if (!selectedTable) return;

    const existingItem = orderItems.find(item => item.menuItem.id === menuItem.id);
    
    let updatedItems;
    if (existingItem) {
      updatedItems = orderItems.map(item =>
        item.menuItem.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.menuItem.price }
          : item
      );
    } else {
      const newItem: OrderItem = {
        id: `${Date.now()}-${menuItem.id}`,
        menuItem,
        quantity: 1,
        total: menuItem.price,
      };
      updatedItems = [...orderItems, newItem];
    }
    
    setOrderItems(updatedItems);
    // Save to tableOrders for persistence
    setTableOrders(prev => ({
      ...prev,
      [selectedTable.id]: updatedItems
    }));
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (!selectedTable) return;
    
    const updatedItems = orderItems.map(item =>
      item.id === itemId
        ? { ...item, quantity, total: quantity * item.menuItem.price }
        : item
    );
    
    setOrderItems(updatedItems);
    // Save to tableOrders for persistence
    setTableOrders(prev => ({
      ...prev,
      [selectedTable.id]: updatedItems
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    if (!selectedTable) return;
    
    const updatedItems = orderItems.filter(item => item.id !== itemId);
    setOrderItems(updatedItems);
    // Save to tableOrders for persistence
    setTableOrders(prev => ({
      ...prev,
      [selectedTable.id]: updatedItems
    }));
  };

  const handleKOT = () => {
    if (!selectedTable || !user || orderItems.length === 0) return;
    setShowKOTModal(true);
  };

  const handleKOTConfirm = () => {
    if (!selectedTable || !user || orderItems.length === 0) return;

    const total = orderItems.reduce((sum, item) => sum + item.total, 0);
    const kotNumber = `KOT-${Date.now().toString().slice(-6)}`;
    
    console.log('KOT (Kitchen Order Ticket) sent to printer:', { 
      kotNumber,
      tableId: selectedTable.id, 
      items: orderItems, 
      total,
      waiter: user.name,
      timestamp: new Date().toISOString()
    });
    
    // Simulate printer functionality
    const printData = {
      restaurantName: "POS Restaurant",
      kotNumber,
      tableNumber: selectedTable.number,
      waiterName: user.name,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      items: orderItems.map(item => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.menuItem.price,
        category: item.menuItem.category,
        notes: item.notes || ""
      })),
      total
    };

    // In a real application, this would send to kitchen printer
    // For now, we'll simulate it
    console.log('🖨️ PRINTING KOT TO KITCHEN PRINTER:', printData);
    
    setShowKOTModal(false);
    alert(`KOT ${kotNumber} sent to kitchen printer successfully! 🖨️`);
  };

  const handleCheckout = () => {
    if (!selectedTable || !user || orderItems.length === 0) return;

    const total = orderItems.reduce((sum, item) => sum + item.total, 0);
    console.log('Order completed:', { tableId: selectedTable.id, items: orderItems, total });
    
    // Update table status back to available
    setTables(prevTables => 
      prevTables.map(t => 
        t.id === selectedTable.id ? { ...t, status: 'available' as const } : t
      )
    );

    // Clear orders for this table and go back to table selection
    setTableOrders(prev => {
      const updated = { ...prev };
      delete updated[selectedTable.id];
      return updated;
    });
    setOrderItems([]);
    setSelectedTable(null);
    alert('Order completed successfully!');
  };

  if (isInitializing) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing restaurant data...</p>
        </div>
      </div>
    );
  }

  console.log('Current tables state:', tables.length, tables);
  console.log('Is initializing:', isInitializing);
  console.log('Selected table:', selectedTable);

  if (!selectedTable) {
    return (
      <div className="h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Waiter Dashboard</h1>
                <p className="text-emerald-100">Order Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-white">Welcome, {user?.name}</p>
                <p className="text-sm text-emerald-100">Service Staff</p>
              </div>
              <button 
                onClick={logout}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select a Table ({tables.length} Tables)
            {tables.length === 0 && <span className="text-sm text-gray-500 ml-2">(Loading...)</span>}
          </h2>
          {tables.length > 0 ? (
            <TableGrid 
              tables={tables} 
              onTableSelect={handleTableSelect}
              selectedTable={selectedTable}
            />
          ) : (
            <div className="text-gray-800 text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-800 border-t-transparent mx-auto mb-4"></div>
              <p>Loading tables...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedTable(null)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-white flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Tables</span>
            </button>
            <div className="bg-white/20 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18v2H3V3zm0 16h18v2H3v-2zm0-8h18v2H3v-2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Table {selectedTable.number}</h1>
              <p className="text-emerald-100">Order Taking Mode</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="font-semibold text-white">Welcome, {user?.name}</p>
              <p className="text-sm text-emerald-100">Service Staff</p>
            </div>
            <button 
              onClick={logout}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        <MenuSidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        <MenuGrid 
          menuItems={filteredMenuItems}
          onItemAdd={handleItemAdd}
        />
        <OrderSummary 
          orderItems={orderItems}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
          onKOT={handleKOT}
          onCheckout={handleCheckout}
        />
      </div>

      {/* KOT Modal */}
      <KOTModal
        isOpen={showKOTModal}
        onClose={() => setShowKOTModal(false)}
        onConfirm={handleKOTConfirm}
        orderItems={orderItems}
        tableNumber={selectedTable.number}
        waiterName={user?.name || 'Waiter'}
      />
    </div>
  );
}