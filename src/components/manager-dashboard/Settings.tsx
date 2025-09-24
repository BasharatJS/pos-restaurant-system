'use client';

import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    restaurantName: 'Spice Garden Restaurant',
    address: '123 Main Street, City, State 12345',
    phone: '+91 9876543210',
    email: 'info@spicegarden.com',
    currency: 'INR',
    taxRate: 18,
    serviceCharge: 10,
    autoKitchenPrint: true,
    orderNotifications: true,
    dailyReports: true,
    tableAutoReset: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // In a real app, this would save to backend/Firebase
    localStorage.setItem('restaurant-settings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem('restaurant-settings');
    if (savedSettings) {
      setSettings({ ...settings, ...JSON.parse(savedSettings) });
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">System Settings</h2>
          <p className="text-gray-600">Configure restaurant settings and preferences</p>
        </div>
        <button
          onClick={saveSettings}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Restaurant Information */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Restaurant Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
              <input
                type="text"
                value={settings.restaurantName}
                onChange={(e) => handleSettingChange('restaurantName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                value={settings.address}
                onChange={(e) => handleSettingChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleSettingChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Business Settings */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="INR">Indian Rupee (₹)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Charge (%)</label>
              <input
                type="number"
                value={settings.serviceCharge}
                onChange={(e) => handleSettingChange('serviceCharge', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Auto Kitchen Print</h4>
                  <p className="text-sm text-gray-600">Automatically print KOT to kitchen</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoKitchenPrint}
                  onChange={(e) => handleSettingChange('autoKitchenPrint', e.target.checked)}
                  className="w-5 h-5 text-blue-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Order Notifications</h4>
                  <p className="text-sm text-gray-600">Show notifications for new orders</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.orderNotifications}
                  onChange={(e) => handleSettingChange('orderNotifications', e.target.checked)}
                  className="w-5 h-5 text-blue-600"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Daily Reports</h4>
                  <p className="text-sm text-gray-600">Generate daily sales reports</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.dailyReports}
                  onChange={(e) => handleSettingChange('dailyReports', e.target.checked)}
                  className="w-5 h-5 text-blue-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-800">Table Auto Reset</h4>
                  <p className="text-sm text-gray-600">Auto reset table status after checkout</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.tableAutoReset}
                  onChange={(e) => handleSettingChange('tableAutoReset', e.target.checked)}
                  className="w-5 h-5 text-blue-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;