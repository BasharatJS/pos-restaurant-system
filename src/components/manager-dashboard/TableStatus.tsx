'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOrders } from '@/context/OrderContext';
import { Table } from '@/types';
import { subscribeToTables, updateTableStatus } from '@/lib/firestore';

const TableStatus: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const { orders } = useOrders();

  useEffect(() => {
    const unsubscribe = subscribeToTables(setTables);
    return unsubscribe;
  }, []);

  const handleTableStatusChange = async (tableId: string, newStatus: Table['status']) => {
    try {
      await updateTableStatus(tableId, newStatus);
    } catch (error) {
      console.error('Error updating table status:', error);
    }
  };

  const getTableColor = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500 hover:bg-green-600';
      case 'occupied': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'reserved': return 'bg-blue-500 hover:bg-blue-600';
      case 'billing': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const statusOptions: Table['status'][] = ['available', 'occupied', 'reserved', 'billing'];

  const statusCounts = {
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    billing: tables.filter(t => t.status === 'billing').length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Table Status Management</h2>
          <p className="text-gray-600">Real-time table status monitoring and control</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-green-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Available</h3>
          <p className="text-3xl font-bold">{statusCounts.available}</p>
          <p className="text-sm opacity-80">Ready for guests</p>
        </div>
        <div className="bg-yellow-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Occupied</h3>
          <p className="text-3xl font-bold">{statusCounts.occupied}</p>
          <p className="text-sm opacity-80">Currently dining</p>
        </div>
        <div className="bg-blue-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Reserved</h3>
          <p className="text-3xl font-bold">{statusCounts.reserved}</p>
          <p className="text-sm opacity-80">Upcoming reservations</p>
        </div>
        <div className="bg-red-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold">Billing</h3>
          <p className="text-3xl font-bold">{statusCounts.billing}</p>
          <p className="text-sm opacity-80">Payment processing</p>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Table Layout</h3>
        <div className="grid grid-cols-6 gap-4">
          {tables.map((table) => (
            <motion.div
              key={table.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center"
            >
              <div className={`${getTableColor(table.status)} text-white rounded-lg p-6 mb-3 transition-all`}>
                <span className="text-2xl font-bold">{table.number}</span>
                <br />
                <span className="text-xs capitalize">{table.status}</span>
              </div>
              <select
                value={table.status}
                onChange={(e) => handleTableStatusChange(table.id.toString(), e.target.value as Table['status'])}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-600 mt-1">Capacity: {table.capacity}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableStatus;