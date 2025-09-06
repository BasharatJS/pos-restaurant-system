'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

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
            Experience Our{' '}
            <span className="text-blue-600">Interactive</span>{' '}
            <span className="text-green-600">Demo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just read about it - try it! Explore our live demo to see 
            how our POS system transforms restaurant operations.
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
                className={`bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 ${
                  activeDemo === demo.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'
                }`}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setActiveDemo(demo.id)}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">{demo.icon}</div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{demo.title}</h4>
                  <p className="text-gray-600 mb-6">{demo.description}</p>
                  
                  <motion.button
                    className={`w-full py-3 px-6 rounded-full font-semibold text-white bg-gradient-to-r ${demo.color} hover:shadow-lg transition-all`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try {demo.title}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Demo Preview */}
          <motion.div
            key={activeDemo}
            className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                {demoOptions.find(d => d.id === activeDemo)?.preview.title}
              </h4>
              <div className="bg-gray-100 rounded-xl p-6 min-h-[200px] flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {demoOptions.find(d => d.id === activeDemo)?.preview.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white rounded-lg p-4 shadow-md text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="text-sm font-semibold text-gray-700">{feature}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
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