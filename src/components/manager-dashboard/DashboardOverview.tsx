'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '@/context/OrderContext';

const DashboardOverview: React.FC = () => {
  const { getTodaysOrders, getTodaysRevenue, orders } = useOrders();

  const todaysOrders = getTodaysOrders();
  const todaysRevenue = getTodaysRevenue();
  const recentOrders = orders.slice(0, 6); // Get 6 most recent orders

  const stats = [
    {
      title: 'Today\'s Orders',
      value: todaysOrders.length.toString(),
      change: todaysOrders.length > 0 ? '+' + Math.round((todaysOrders.length / 10) * 100) + '%' : '0%',
      icon: '🧾',
      color: 'bg-blue-500'
    },
    {
      title: 'Revenue',
      value: '₹' + todaysRevenue.toLocaleString(),
      change: todaysRevenue > 0 ? '+' + Math.round((todaysRevenue / 1000) * 10) + '%' : '0%',
      icon: '💰',
      color: 'bg-green-500'
    },
    {
      title: 'Active Orders',
      value: orders.filter(o => o.status === 'preparing' || o.status === 'ready').length + '/24',
      change: Math.round((orders.filter(o => o.status !== 'completed').length / 24) * 100) + '%',
      icon: '🪑',
      color: 'bg-orange-500'
    },
    {
      title: 'Total Orders',
      value: orders.length.toString(),
      change: '100%',
      icon: '👥',
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from yesterday</p>
              </div>
              <div className={`${stat.color} rounded-lg p-3 text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Table</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waiter</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Table {order.tableNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.items.slice(0, 2).map(item => item.menuItem.name).join(', ')}
                    {order.items.length > 2 && ` +${order.items.length - 2} more`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'ready' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.waiterName}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No orders yet. Orders from waiter checkout will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;