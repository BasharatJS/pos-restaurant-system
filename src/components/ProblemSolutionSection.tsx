'use client';

import { motion } from 'framer-motion';

export default function ProblemSolutionSection() {
  const problems = [
    {
      icon: '⏰',
      title: 'Long Wait Times',
      description: 'Customers waiting too long for orders during peak hours'
    },
    {
      icon: '📝',
      title: 'Order Mix-ups',
      description: 'Miscommunication leading to wrong orders served'
    },
    {
      icon: '👥',
      title: 'Table Management',
      description: 'Difficulty tracking table availability and status'
    },
    {
      icon: '💸',
      title: 'Revenue Tracking',
      description: 'Manual billing causing revenue calculation errors'
    }
  ];

  const solutions = [
    {
      icon: '🚀',
      title: 'Smart POS System',
      description: 'Lightning-fast order processing reducing wait times by 70%'
    },
    {
      icon: '📱',
      title: 'Digital Order Flow',
      description: 'Direct kitchen communication eliminating order errors'
    },
    {
      icon: '🪑',
      title: 'Real-time Table Status',
      description: 'Visual table management with live availability updates'
    },
    {
      icon: '💰',
      title: 'Automated Billing',
      description: 'Accurate revenue tracking with digital receipts and reports'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Why{' '}
            <span className="text-green-600">Spice Garden</span>{' '}
            Chose{' '}
            <span className="text-yellow-500">Digital Innovation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every great restaurant faces operational challenges. At Spice Garden,
            we solved them with smart technology that enhances both customer experience and staff efficiency.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Problems Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-3xl font-bold text-red-600 mb-8 text-center"
              variants={itemVariants}
            >
              Before Our Digital Transformation
            </motion.h3>
            
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{problem.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        {problem.title}
                      </h4>
                      <p className="text-gray-600">{problem.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-3xl font-bold text-green-600 mb-8 text-center"
              variants={itemVariants}
            >
              Our Smart Solutions Today
            </motion.h3>
            
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{solution.icon}</div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">
                        {solution.title}
                      </h4>
                      <p className="text-gray-600">{solution.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-10 py-4 rounded-full font-bold text-xl hover:from-green-700 hover:to-yellow-600 transition-all shadow-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 35px rgba(34, 197, 94, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
Experience Spice Garden's Digital Excellence
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}