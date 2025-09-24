'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: '📊', color: 'text-blue-600' },
    { id: 'orders', title: 'Orders', icon: '🧾', color: 'text-green-600' },
    { id: 'tables', title: 'Table Status', icon: '🪑', color: 'text-orange-600' },
    { id: 'menu', title: 'Menu Management', icon: '🍽️', color: 'text-red-600' },
    { id: 'staff', title: 'Staff Performance', icon: '👥', color: 'text-teal-600' },
    { id: 'reports', title: 'Reports & Analytics', icon: '📋', color: 'text-indigo-600' },
    { id: 'settings', title: 'Settings', icon: '⚙️', color: 'text-gray-600' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col overflow-hidden">
      {/* Navigation Items - Scrollable */}
      <nav className="flex-1 p-4 overflow-y-auto pt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <motion.li key={item.id}>
              <motion.button
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`text-xl ${activeSection === item.id ? 'text-blue-600' : item.color}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.title}</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                  />
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;