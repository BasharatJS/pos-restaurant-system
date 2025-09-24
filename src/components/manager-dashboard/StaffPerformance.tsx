'use client';

import React from 'react';
import { useOrders } from '@/context/OrderContext';

const StaffPerformance: React.FC = () => {
  const { orders } = useOrders();

  // Calculate staff performance metrics
  const staffMetrics: { [key: string]: {
    name: string;
    orders: number;
    revenue: number;
    avgOrder: number;
    lastOrder: Date | null;
  } } = {};

  orders.forEach(order => {
    const waiterId = order.waiterId;
    const waiterName = order.waiterName;

    if (!staffMetrics[waiterId]) {
      staffMetrics[waiterId] = {
        name: waiterName,
        orders: 0,
        revenue: 0,
        avgOrder: 0,
        lastOrder: null
      };
    }

    staffMetrics[waiterId].orders += 1;
    staffMetrics[waiterId].revenue += order.total;

    const orderDate = new Date(order.timestamp);
    if (!staffMetrics[waiterId].lastOrder || orderDate > staffMetrics[waiterId].lastOrder!) {
      staffMetrics[waiterId].lastOrder = orderDate;
    }
  });

  // Calculate average order value for each staff
  Object.values(staffMetrics).forEach(staff => {
    staff.avgOrder = staff.orders > 0 ? staff.revenue / staff.orders : 0;
  });

  const staffList = Object.values(staffMetrics).sort((a, b) => b.revenue - a.revenue);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayOrders = orders.filter(order => new Date(order.timestamp) >= todayStart);

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Staff Performance</h2>
        <p className="text-gray-600">Monitor waiter performance and productivity metrics</p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Active Staff</h3>
          <p className="text-3xl font-bold">{staffList.length}</p>
          <p className="text-sm opacity-80">Total waiters</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Top Performer</h3>
          <p className="text-lg font-bold">{staffList[0]?.name || 'No data'}</p>
          <p className="text-sm opacity-80">Highest revenue</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Today's Orders</h3>
          <p className="text-3xl font-bold">{todayOrders.length}</p>
          <p className="text-sm opacity-80">All staff combined</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Avg Performance</h3>
          <p className="text-2xl font-bold">
            ₹{staffList.length > 0 ? Math.round(staffList.reduce((sum, staff) => sum + staff.avgOrder, 0) / staffList.length) : 0}
          </p>
          <p className="text-sm opacity-80">Per order</p>
        </div>
      </div>

      {/* Staff Performance Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Staff Performance Rankings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Order Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staffList.length > 0 ? staffList.map((staff, index) => {
                const performanceScore = (staff.revenue / (staffList[0]?.revenue || 1)) * 100;
                return (
                  <tr key={staff.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {staff.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₹{staff.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{staff.avgOrder.toFixed(0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {staff.lastOrder ? staff.lastOrder.toLocaleDateString() : 'No orders'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className={`h-2 rounded-full ${
                              performanceScore >= 80 ? 'bg-green-500' :
                              performanceScore >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${performanceScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{performanceScore.toFixed(0)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No staff performance data available yet
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

export default StaffPerformance;