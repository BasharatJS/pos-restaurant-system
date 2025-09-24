'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const getFeatureIcon = (feature: string, demoType: string) => {
  const iconMap: Record<string, string> = {
    'Table Layout View': '🪑',
    'Quick Order Entry': '⚡',
    'Real-time Status': '🔄',
    'Customer Notes': '📝',
    'Sales Dashboard': '📊',
    'Staff Performance': '👥',
    'Inventory Tracking': '📦',
    'Revenue Reports': '💰',
    'Multi-location Control': '🏢',
    'User Management': '👤',
    'System Settings': '⚙️',
    'Financial Reports': '💹',
    'Live Order Queue': '📋',
    'Recipe Management': '👨‍🍳',
    'Order Status Updates': '✅',
    'Preparation Time Tracking': '⏱️'
  };
  return iconMap[feature] || '🍽️';
};

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState('waiter');
  const [activeScenario, setActiveScenario] = useState(0);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const demoOptions = [
    {
      id: 'waiter',
      icon: '📱',
      title: 'Waiter Dashboard',
      description: 'Experience table management and order taking',
      color: 'from-green-500 to-emerald-600',
      preview: {
        title: 'Live Waiter Interface',
        features: ['Table Layout View', 'Quick Order Entry', 'Real-time Status', 'Customer Notes']
      }
    },
    {
      id: 'manager',
      icon: '👨‍💼',
      title: 'Manager Dashboard',
      description: 'See analytics and reports in action',
      color: 'from-blue-500 to-indigo-600',
      preview: {
        title: 'Manager Analytics Panel',
        features: ['Sales Dashboard', 'Staff Performance', 'Inventory Tracking', 'Revenue Reports']
      }
    },
    {
      id: 'admin',
      icon: '👑',
      title: 'Admin Panel Tour',
      description: 'Explore complete system management',
      color: 'from-purple-500 to-violet-600',
      preview: {
        title: 'Admin Control Center',
        features: ['Multi-location Control', 'User Management', 'System Settings', 'Financial Reports']
      }
    }
  ];

  const scenarios = [
    {
      title: 'Order Taking Scenario',
      icon: '🍽️',
      steps: [
        'Select Table 5 (4 guests)',
        'Add items: 2x Butter Chicken, 1x Dal Makhani, 3x Roti',
        'Add special instructions',
        'Generate KOT and send to kitchen'
      ],
      color: 'bg-green-100 border-green-300'
    },
    {
      title: 'Busy Restaurant Simulation',
      icon: '🏃‍♀️',
      steps: [
        'Multiple tables with active orders',
        'Kitchen queue with different order statuses',
        'Real-time updates demonstration',
        'Staff coordination workflows'
      ],
      color: 'bg-orange-100 border-orange-300'
    },
    {
      title: 'Manager Analytics View',
      icon: '📊',
      steps: [
        'Today\'s sales: ₹45,250',
        'Most popular items analysis',
        'Average order value: ₹850',
        'Peak hours performance'
      ],
      color: 'bg-blue-100 border-blue-300'
    }
  ];

  const videoFeatures = [
    { icon: '🏢', title: 'Restaurant Setup', description: 'Complete system configuration walkthrough' },
    { icon: '👥', title: 'Staff Onboarding', description: 'How to train your team effectively' },
    { icon: '⚡', title: 'Daily Operations', description: 'Streamlined workflow demonstration' },
    { icon: '📈', title: 'Analytics & Reports', description: 'Business insights and reporting' }
  ];

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            See Our{' '}
            <span className="text-green-600">Digital Kitchen</span>{' '}
            in{' '}
            <span className="text-yellow-500">Action</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Witness how Spice Garden revolutionized restaurant operations with smart technology.
            Experience our digital workflow and see why customers love dining with us.
          </p>
        </motion.div>

        {/* Live Demo Access */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            variants={itemVariants}
          >
            🖥️ Try Live Demo Now
          </motion.h3>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {demoOptions.map((demo, index) => (
              <motion.div
                key={demo.id}
                variants={itemVariants}
                className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 relative overflow-hidden ${
                  activeDemo === demo.id
                    ? 'border-blue-500 ring-4 ring-blue-200 shadow-2xl scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ y: -10, scale: activeDemo === demo.id ? 1.05 : 1.02 }}
                onClick={() => setActiveDemo(demo.id)}
              >
                {/* Selected indicator */}
                {activeDemo === demo.id && (
                  <motion.div
                    className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓
                  </motion.div>
                )}

                {/* Background decoration */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${demo.color} opacity-10 rounded-full -mr-12 -mt-12`} />

                <div className="text-center relative">
                  <motion.div
                    className="text-6xl mb-6"
                    animate={{
                      rotateY: activeDemo === demo.id ? [0, 360] : 0,
                      scale: activeDemo === demo.id ? [1, 1.1, 1] : 1
                    }}
                    transition={{ duration: 1, repeat: activeDemo === demo.id ? Infinity : 0, repeatDelay: 3 }}
                  >
                    {demo.icon}
                  </motion.div>

                  <h4 className="text-2xl font-bold text-gray-800 mb-4">{demo.title}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">{demo.description}</p>

                  <motion.button
                    className={`w-full py-4 px-6 rounded-full font-bold text-white bg-gradient-to-r ${demo.color} hover:shadow-lg transition-all relative overflow-hidden`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white opacity-20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">
                      {activeDemo === demo.id ? '🔥 Active Preview' : `Try ${demo.title}`}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Demo Preview */}
          <motion.div
            key={activeDemo}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl max-w-6xl mx-auto border border-gray-200"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-center mb-8">
              <motion.h4
                className="text-3xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {demoOptions.find(d => d.id === activeDemo)?.preview.title}
              </motion.h4>
              <motion.p
                className="text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Interactive preview of our restaurant management system
              </motion.p>

              {/* Enhanced Dashboard Preview */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-6 min-h-[400px] shadow-inner relative overflow-hidden">
                {/* Mock Browser Header */}
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-600">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-gray-600 rounded-full px-4 py-1 text-xs text-gray-300 text-left">
                    spicegarden-pos.com/{activeDemo}-dashboard
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {demoOptions.find(d => d.id === activeDemo)?.preview.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-gradient-to-br from-white to-gray-100 rounded-lg p-6 shadow-lg text-center border-l-4 border-green-500 hover:scale-105 transition-transform"
                      initial={{ opacity: 0, y: 30, rotateX: -15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: idx * 0.15 + 0.4, duration: 0.6 }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        borderLeftColor: "#f59e0b"
                      }}
                    >
                      <motion.div
                        className="text-2xl mb-3"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                      >
                        {getFeatureIcon(feature, activeDemo)}
                      </motion.div>
                      <div className="text-sm font-bold text-gray-800 mb-2">{feature}</div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: idx * 0.2 + 0.8, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Live Activity Indicators */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-yellow-400 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-4 left-4 text-xs text-gray-400">
                  🔄 Live Data • Real-time Updates
                </div>
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                  👥 {Math.floor(Math.random() * 15) + 5} Active Users
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                className={`mt-6 px-8 py-3 rounded-full font-bold text-white bg-gradient-to-r ${
                  demoOptions.find(d => d.id === activeDemo)?.color
                } hover:shadow-lg transition-all`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                🚀 Try Interactive Demo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Demo Scenarios */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            variants={itemVariants}
          >
            📋 Interactive Scenarios
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl transition-all cursor-pointer ${scenario.color} ${
                  activeScenario === index ? 'ring-2 ring-blue-300' : ''
                }`}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setActiveScenario(index)}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{scenario.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800">{scenario.title}</h4>
                </div>

                <ul className="space-y-3">
                  {scenario.steps.map((step, stepIndex) => (
                    <motion.li
                      key={stepIndex}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: activeScenario === index ? 1 : 0.7,
                        x: 0 
                      }}
                      transition={{ delay: stepIndex * 0.1 }}
                    >
                      <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-700 mt-0.5">
                        {stepIndex + 1}
                      </span>
                      <span className="text-gray-700 text-sm">{step}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Walkthrough */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            variants={itemVariants}
          >
            🎥 5-Minute Product Tour
          </motion.h3>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl mb-8"
              variants={itemVariants}
            >
              <div className="aspect-video bg-gray-700 rounded-xl flex items-center justify-center mb-6">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-6xl text-white mb-4">▶️</div>
                  <p className="text-white text-lg">Click to Watch Demo Video</p>
                </motion.div>
              </div>
              
              <motion.button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full font-bold text-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                🎬 Watch Full Demo (5 minutes)
              </motion.button>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h5 className="font-bold text-gray-800 mb-2">{feature.title}</h5>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Guided Demo Request */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            variants={itemVariants}
          >
            📅 Schedule Personal Demo
          </motion.h3>

          <motion.div
            className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-xl"
            variants={itemVariants}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-2xl font-bold text-gray-800 mb-6">
                  Get a Customized Demo
                </h4>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <span className="text-2xl">📅</span>
                    <span>30-minute personalized consultation</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-2xl">🎯</span>
                    <span>Demo tailored to your restaurant type</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-2xl">💡</span>
                    <span>Implementation planning discussion</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-2xl">📞</span>
                    <span>Direct access to our experts</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Restaurant Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Select Restaurant Type</option>
                  <option>Fine Dining</option>
                  <option>Casual Dining</option>
                  <option>Quick Service</option>
                  <option>Cafe/Bakery</option>
                  <option>Food Truck</option>
                </select>
                
                <motion.button
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-700 hover:to-blue-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule My Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}