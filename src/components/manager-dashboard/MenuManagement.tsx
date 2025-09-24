'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MenuItem, MenuCategory } from '@/types';
import {
  subscribeToAllMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '@/lib/firestore';

// Menu Item Modal Component
const MenuItemModal = ({ isOpen, onClose, onSave, editingItem }: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<MenuItem, 'id'>) => void;
  editingItem?: MenuItem | null;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'food' as MenuCategory,
    available: true
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        price: editingItem.price.toString(),
        category: editingItem.category,
        available: editingItem.available
      });
    } else {
      setFormData({ name: '', price: '', category: 'food', available: true });
    }
  }, [editingItem, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      available: formData.available
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Item Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as MenuCategory }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="food">Food</option>
              <option value="fast-food">Fast Food</option>
              <option value="sweet">Sweet</option>
              <option value="chinese">Chinese</option>
              <option value="popular">Popular</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="available"
              checked={formData.available}
              onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
              className="w-5 h-5 text-blue-600"
            />
            <label htmlFor="available" className="text-sm font-semibold text-gray-700">
              Item Available
            </label>
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editingItem ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAllMenuItems(setMenuItems);
    return unsubscribe;
  }, []);

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  const categories: (MenuCategory | 'all')[] = ['all', 'food', 'fast-food', 'sweet', 'chinese', 'popular'];

  const handleAddItem = async (itemData: Omit<MenuItem, 'id'>) => {
    try {
      await addMenuItem(itemData);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add menu item');
    }
  };

  const handleUpdateItem = async (itemData: Omit<MenuItem, 'id'>) => {
    if (!editingItem) return;
    try {
      await updateMenuItem(editingItem.id, itemData);
      setIsModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update menu item');
    }
  };

  const handleDeleteItem = async (item: MenuItem) => {
    if (window.confirm(`Delete "${item.name}"?`)) {
      try {
        await deleteMenuItem(item.id);
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete menu item');
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Menu Management</h2>
          <p className="text-gray-600">Manage restaurant menu items and pricing</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          + Add New Item
        </button>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All Items' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                {category === 'all' ? menuItems.length : menuItems.filter(item => item.category === category).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Menu Items ({filteredItems.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => {
            const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500'];
            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`${colors[index % colors.length]} text-white rounded-xl p-6 relative`}
              >
                {!item.available && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                    Unavailable
                  </div>
                )}
                <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                <p className="text-2xl font-bold mb-1">₹{item.price}</p>
                <p className="text-sm opacity-80 capitalize mb-4">{item.category.replace('-', ' ')}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className="flex-1 bg-red-600/50 hover:bg-red-600/70 py-2 rounded-lg text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Menu Item Modal */}
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
};

export default MenuManagement;