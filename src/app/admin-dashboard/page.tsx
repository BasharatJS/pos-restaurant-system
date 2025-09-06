'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { MenuItem, MenuCategory } from '@/types';
import { 
  subscribeToAllMenuItems, 
  addMenuItem, 
  updateMenuItem, 
  deleteMenuItem,
  initializeMenuItems 
} from '@/lib/firestore';

// Header Component
const AdminHeader = ({ user, logout }: { user: any; logout: () => void }) => (
  <motion.div 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white shadow-2xl"
  >
    <div className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <motion.div 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="flex items-center space-x-4"
        >
          <div className="bg-white/20 p-3 rounded-full">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 22.99c0 .55.45 1 1 1h15.03c.55 0 1-.45 1-1v-7.49c0-2.47-1.19-4.36-3.13-5.1-1.26-.48-2.58-.64-4.65-.64-2.07 0-3.39.16-4.65.64C3.68 11.14 2.49 13.03 2.49 15.5l-1.49 7.49z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-orange-100">Menu Management System</p>
          </div>
        </motion.div>
        <motion.div 
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          className="flex items-center space-x-4"
        >
          <div className="text-right">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-orange-100">Administrator</p>
          </div>
          <button
            onClick={logout}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// Stats Cards Component
const StatsCards = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const stats = [
    {
      title: 'Total Items',
      value: menuItems.length,
      color: 'from-blue-500 to-blue-600',
      icon: '🍽️'
    },
    {
      title: 'Available',
      value: menuItems.filter(item => item.available).length,
      color: 'from-green-500 to-green-600',
      icon: '✅'
    },
    {
      title: 'Categories',
      value: new Set(menuItems.map(item => item.category)).size,
      color: 'from-purple-500 to-purple-600',
      icon: '📂'
    },
    {
      title: 'Unavailable',
      value: menuItems.filter(item => !item.available).length,
      color: 'from-red-500 to-red-600',
      icon: '❌'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-80">{stat.title}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            <div className="text-4xl opacity-80">{stat.icon}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Category Filter Component
const CategoryFilter = ({ 
  selectedCategory, 
  onCategorySelect, 
  menuItems 
}: { 
  selectedCategory: MenuCategory | 'all'; 
  onCategorySelect: (category: MenuCategory | 'all') => void;
  menuItems: MenuItem[];
}) => {
  const categories: (MenuCategory | 'all')[] = ['all', 'food', 'fast-food', 'sweet', 'chinese', 'popular'];
  
  const getCategoryCount = (category: MenuCategory | 'all') => {
    if (category === 'all') return menuItems.length;
    return menuItems.filter(item => item.category === category).length;
  };

  const getCategoryName = (category: MenuCategory | 'all') => {
    switch (category) {
      case 'all': return 'All Items';
      case 'food': return 'Food';
      case 'fast-food': return 'Fast Food';
      case 'sweet': return 'Sweets';
      case 'chinese': return 'Chinese';
      case 'popular': return 'Popular';
      default: return category;
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Filter by Category</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategorySelect(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2
              ${selectedCategory === category 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            <span>{getCategoryName(category)}</span>
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {getCategoryCount(category)}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// Add/Edit Menu Item Modal
const MenuItemModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingItem 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: (item: Omit<MenuItem, 'id'>) => void;
  editingItem?: MenuItem | null;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'food' as MenuCategory,
    description: '',
    available: true
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        price: editingItem.price.toString(),
        category: editingItem.category,
        description: editingItem.description || '',
        available: editingItem.available
      });
    } else {
      setFormData({
        name: '',
        price: '',
        category: 'food',
        description: '',
        available: true
      });
    }
  }, [editingItem, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      description: formData.description,
      available: formData.available
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter item name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (₹)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as MenuCategory }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="food">Food</option>
              <option value="fast-food">Fast Food</option>
              <option value="sweet">Sweet</option>
              <option value="chinese">Chinese</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              placeholder="Enter item description"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
              className="w-5 h-5 text-red-600"
            />
            <label htmlFor="available" className="text-sm font-semibold text-gray-700">
              Item Available
            </label>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-semibold"
            >
              {editingItem ? 'Update' : 'Add'} Item
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Menu Items Grid Component
const MenuItemsGrid = ({ 
  menuItems, 
  onEdit, 
  onDelete 
}: { 
  menuItems: MenuItem[]; 
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}) => {
  const getItemColor = (index: number) => {
    const colors = [
      'from-red-500 to-red-600',
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-yellow-500 to-yellow-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-gradient-to-br ${getItemColor(index)} rounded-xl p-6 text-white shadow-xl relative overflow-hidden`}
          >
            {!item.available && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Unavailable
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-2xl font-bold">₹{item.price}</p>
              <p className="text-sm opacity-80 capitalize">{item.category.replace('-', ' ')}</p>
              {item.description && (
                <p className="text-sm opacity-70 mt-2 line-clamp-2">{item.description}</p>
              )}
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(item)}
                className="flex-1 bg-white/20 hover:bg-white/30 py-2 px-4 rounded-lg font-semibold transition-all duration-200"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(item)}
                className="flex-1 bg-red-500/50 hover:bg-red-500/70 py-2 px-4 rounded-lg font-semibold transition-all duration-200"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Main Admin Dashboard Component
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeMenuItems();
        const unsubscribe = subscribeToAllMenuItems((items) => {
          setMenuItems(items);
          setIsLoading(false);
        });
        return unsubscribe;
      } catch (error) {
        console.error('Failed to initialize menu items:', error);
        setIsLoading(false);
      }
    };
    
    initialize();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.category === selectedCategory));
    }
  }, [menuItems, selectedCategory]);

  const handleAddItem = async (itemData: Omit<MenuItem, 'id'>) => {
    try {
      await addMenuItem(itemData);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add menu item. Please try again.');
    }
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleUpdateItem = async (itemData: Omit<MenuItem, 'id'>) => {
    if (!editingItem) return;
    
    try {
      await updateMenuItem(editingItem.id, itemData);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update menu item. Please try again.');
    }
  };

  const handleDeleteItem = async (item: MenuItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      try {
        await deleteMenuItem(item.id);
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete menu item. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <AdminHeader user={user} logout={logout} />
      
      <div className="container mx-auto px-6 py-8 pt-35">
        <StatsCards menuItems={menuItems} />
        
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          menuItems={menuItems}
        />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Menu Items ({filteredItems.length})
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingItem(null);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg flex items-center space-x-2"
            >
              <span>+</span>
              <span>Add New Item</span>
            </motion.button>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2">No menu items found</h3>
              <p>Add your first menu item to get started!</p>
            </div>
          ) : (
            <MenuItemsGrid 
              menuItems={filteredItems}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          )}
        </motion.div>
      </div>

      <MenuItemModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={editingItem ? handleUpdateItem : handleAddItem}
        editingItem={editingItem}
      />
    </div>
  );
}