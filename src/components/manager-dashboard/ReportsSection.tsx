'use client';

import React, { useState } from 'react';
import { useOrders } from '@/context/OrderContext';

const ReportsSection: React.FC = () => {
  const { orders, getTodaysOrders, getTodaysRevenue } = useOrders();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'all'>('today');

  const getOrdersForPeriod = () => {
    const now = new Date();
    switch (selectedPeriod) {
      case 'today':
        return getTodaysOrders();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orders.filter(order => new Date(order.timestamp) >= weekAgo);
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return orders.filter(order => new Date(order.timestamp) >= monthAgo);
      default:
        return orders;
    }
  };

  const periodOrders = getOrdersForPeriod();
  const periodRevenue = periodOrders.reduce((sum, order) => sum + order.total, 0);

  // Generate daily breakdown for the period
  const dailyBreakdown: { [key: string]: { orders: number; revenue: number } } = {};
  periodOrders.forEach(order => {
    const date = new Date(order.timestamp).toLocaleDateString();
    if (!dailyBreakdown[date]) {
      dailyBreakdown[date] = { orders: 0, revenue: 0 };
    }
    dailyBreakdown[date].orders += 1;
    dailyBreakdown[date].revenue += order.total;
  });

  // Calculate popular items
  const itemCounts: { [key: string]: { name: string; count: number; revenue: number } } = {};
  periodOrders.forEach(order => {
    order.items.forEach(item => {
      const key = item.menuItem.name;
      if (!itemCounts[key]) {
        itemCounts[key] = { name: item.menuItem.name, count: 0, revenue: 0 };
      }
      itemCounts[key].count += item.quantity;
      itemCounts[key].revenue += item.total;
    });
  });

  const popularItems = Object.values(itemCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Calculate hourly sales data (last 24 hours)
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const todaysOrders = getTodaysOrders();
    const ordersInHour = todaysOrders.filter(order => {
      const orderHour = new Date(order.timestamp).getHours();
      return orderHour === hour;
    });
    return {
      hour: `${hour}:00`,
      orders: ordersInHour.length,
      revenue: ordersInHour.reduce((sum, order) => sum + order.total, 0)
    };
  });

  const maxRevenue = Math.max(...hourlyData.map(d => d.revenue));

  const downloadReport = () => {
    const reportData = {
      period: selectedPeriod,
      summary: {
        totalOrders: periodOrders.length,
        totalRevenue: periodRevenue,
        averageOrderValue: periodOrders.length > 0 ? periodRevenue / periodOrders.length : 0
      },
      dailyBreakdown,
      popularItems,
      hourlyData: selectedPeriod === 'today' ? hourlyData : [],
      orders: periodOrders.map(order => ({
        id: order.id,
        tableNumber: order.tableNumber,
        waiterName: order.waiterName,
        total: order.total,
        status: order.status,
        timestamp: order.timestamp,
        items: order.items.map(item => ({
          name: item.menuItem.name,
          quantity: item.quantity,
          price: item.menuItem.price,
          total: item.total
        }))
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `restaurant-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reports & Analytics</h2>
          <p className="text-gray-600">Comprehensive business reports and insights</p>
        </div>

        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>

          <button
            onClick={downloadReport}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold">{periodOrders.length}</p>
          <p className="text-sm opacity-80 capitalize">{selectedPeriod} period</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold">₹{periodRevenue.toLocaleString()}</p>
          <p className="text-sm opacity-80">Gross sales</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Avg Order Value</h3>
          <p className="text-3xl font-bold">
            ₹{periodOrders.length > 0 ? Math.round(periodRevenue / periodOrders.length) : 0}
          </p>
          <p className="text-sm opacity-80">Per order</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Peak Performance</h3>
          <p className="text-3xl font-bold">
            {hourlyData.reduce((peak, curr) => curr.revenue > peak.revenue ? curr : peak, hourlyData[0]).hour}
          </p>
          <p className="text-sm opacity-80">Highest sales hour</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Sales Chart (only for today) */}
        {selectedPeriod === 'today' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Hourly Sales (Today)</h3>
            <div className="space-y-2">
              {hourlyData.filter(d => d.revenue > 0).slice(-8).map((data, index) => (
                <div key={`hour-${data.hour}-${index}`} className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-600 w-12">{data.hour}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${maxRevenue > 0 ? (data.revenue / maxRevenue) * 100 : 0}%` }}
                    >
                      <span className="text-white text-xs font-semibold">₹{data.revenue}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{data.orders}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Menu Items */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Menu Items</h3>
          <div className="space-y-4">
            {popularItems.length > 0 ? popularItems.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-500' :
                  'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.count} orders • ₹{item.revenue.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    #{index + 1}
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-gray-600 text-center py-8">No orders yet to analyze</p>
            )}
          </div>
        </div>
      </div>

      {/* Daily Breakdown Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Daily Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(dailyBreakdown).length > 0 ? Object.entries(dailyBreakdown)
                .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
                .map(([date, data]) => {
                  const avgOrder = data.orders > 0 ? data.revenue / data.orders : 0;
                  return (
                    <tr key={date} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.orders}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₹{data.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{avgOrder.toFixed(0)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  );
                }) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No data available for the selected period
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

export default ReportsSection;