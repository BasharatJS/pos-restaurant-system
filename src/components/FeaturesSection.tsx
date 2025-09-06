'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('waiters');

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const roleFeatures = {
    waiters: [
      { icon: '📱', title: 'Digital Table Management', description: 'Visual table layout with real-time status' },
      { icon: '🍽️', title: 'Smart Menu System', description: 'Categorized menu with search and filtering' },
      { icon: '📝', title: 'Quick Order Taking', description: 'One-tap item selection with quantity controls' },
      { icon: '🧾', title: 'Instant KOT Generation', description: 'Digital kitchen order tickets' },
      { icon: '💬', title: 'Customer Notes', description: 'Special instructions and preferences' }
    ],
    kitchen: [
      { icon: '📋', title: 'Digital KOT Display', description: 'Clear order details with timing' },
      { icon: '⏰', title: 'Order Queue Management', description: 'Priority-based order processing' },
      { icon: '✅', title: 'Order Status Updates', description: 'Mark orders as preparing/ready/served' },
      { icon: '📊', title: 'Preparation Time Tracking', description: 'Monitor kitchen efficiency' }
    ],
    managers: [
      { icon: '📈', title: 'Sales Analytics', description: 'Real-time revenue and performance metrics' },
      { icon: '👥', title: 'Staff Management', description: 'Track waiter performance and shifts' },
      { icon: '📦', title: 'Inventory Tracking', description: 'Monitor stock levels and alerts' },
      { icon: '🎯', title: 'Menu Optimization', description: 'Popular items and profit analysis' }
    ],
    admins: [
      { icon: '🏢', title: 'Multi-location Management', description: 'Centralized control across branches' },
      { icon: '💰', title: 'Financial Reports', description: 'Comprehensive business insights' },
      { icon: '👤', title: 'User Management', description: 'Role-based access control' },
      { icon: '⚙️', title: 'System Configuration', description: 'Customize settings and workflows' }
    ]
  };

  const technicalFeatures = [
    { icon: '☁️', title: 'Cloud-based', description: 'Access from anywhere, automatic backups' },
    { icon: '📱', title: 'Mobile Responsive', description: 'Works on tablets, phones, and desktops' },
    { icon: '🔄', title: 'Real-time Sync', description: 'Instant updates across all devices' },
    { icon: '🔒', title: 'Secure', description: 'Bank-level security with data encryption' },
    { icon: '🌐', title: 'Offline Mode', description: 'Continue operations even without internet' }
  ];

  const integrations = [
    { icon: '💳', title: 'Payment Gateways', description: 'UPI, Card, Cash, Digital wallets' },
    { icon: '🧾', title: 'GST Billing', description: 'Automated tax calculations and invoicing' },
    { icon: '📧', title: 'Email/SMS', description: 'Customer receipts and notifications' },
    { icon: '📊', title: 'Accounting Software', description: 'Tally, QuickBooks integration' },
    { icon: '🚚', title: 'Delivery Partners', description: 'Zomato, Swiggy integration ready' }
  ];

  const tabs = [
    { id: 'waiters', label: 'For Waiters', color: 'text-green-600 border-green-600' },
    { id: 'kitchen', label: 'Kitchen Staff', color: 'text-orange-600 border-orange-600' },
    { id: 'managers', label: 'Managers', color: 'text-blue-600 border-blue-600' },
    { id: 'admins', label: 'Admins', color: 'text-purple-600 border-purple-600' }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Powerful{' '}
            <span className="text-green-600">Features</span>{' '}
            for Every{' '}
            <span className="text-yellow-500">Team Member</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From waiters to managers, our POS system empowers every role 
            with specialized tools designed for maximum efficiency.
          </p>
        </motion.div>

        {/* Role-based Features Tabs */}
        <div className="mb-16">
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all border-2 ${
                  activeTab === tab.id 
                    ? `${tab.color} bg-opacity-10` 
                    : 'text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {roleFeatures[activeTab as keyof typeof roleFeatures].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Technical Features */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-center text-gray-800 mb-8"
            variants={itemVariants}
          >
            Technical Excellence
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {technicalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-center"
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Capabilities */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-center text-gray-800 mb-8"
            variants={itemVariants}
          >
            Seamless Integrations
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all text-center"
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="text-3xl mb-4"
                  whileHover={{ scale: 1.3, rotate: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {integration.icon}
                </motion.div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{integration.title}</h4>
                <p className="text-gray-600 text-sm">{integration.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:from-green-700 hover:to-blue-700 transition-all shadow-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}