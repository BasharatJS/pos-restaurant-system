'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { initializeTables, initializeMenuItems } from '@/lib/firestore';

// Import all components
import Sidebar from '@/components/manager-dashboard/Sidebar';
import Header from '@/components/manager-dashboard/Header';
import DashboardOverview from '@/components/manager-dashboard/DashboardOverview';
import OrdersSection from '@/components/manager-dashboard/OrdersSection';
import TableStatus from '@/components/manager-dashboard/TableStatus';
import MenuManagement from '@/components/manager-dashboard/MenuManagement';
import StaffPerformance from '@/components/manager-dashboard/StaffPerformance';
import ReportsSection from '@/components/manager-dashboard/ReportsSection';
import Settings from '@/components/manager-dashboard/Settings';

// Main Manager Dashboard Component
export default function ManagerDashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Initialize Firebase data
  useEffect(() => {
    const initializeData = async () => {
      try {
        await initializeTables();
        await initializeMenuItems();
      } catch (error) {
        console.error('Failed to initialize data:', error);
      }
    };

    if (user) {
      initializeData();
    }
  }, [user]);

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'orders':
        return <OrdersSection />;
      case 'tables':
        return <TableStatus />;
      case 'menu':
        return <MenuManagement />;
      case 'staff':
        return <StaffPerformance />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header - Full Width */}
      <Header user={user} logout={logout} />

      {/* Main Content with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}