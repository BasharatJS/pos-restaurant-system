'use client';

import { motion } from 'framer-motion';

export default function ProblemSolutionSection() {
  const problems = [
    {
      icon: '❌',
      title: 'Manual Order Taking',
      description: 'Manual order taking leads to errors and delays'
    },
    {
      icon: '📱',
      title: 'Poor Communication',
      description: 'Poor communication between staff and kitchen'
    },
    {
      icon: '📈',
      title: 'Tracking Difficulties',
      description: 'Difficulty tracking sales and inventory'
    },
    {
      icon: '😤',
      title: 'Customer Complaints',
      description: 'Customer complaints about slow service'
    }
  ];

  const solutions = [
    {
      icon: '✅',
      title: 'Digital Menu',
      description: 'Digital menu with real-time updates'
    },
    {
      icon: '⚡',
      title: 'Instant Orders',
      description: 'Instant order transmission to kitchen'
    },
    {
      icon: '📊',
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics dashboard'
    },
    {
      icon: '📱',
      title: 'Mobile Interface',
      description: 'Mobile-friendly interface for staff'
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
            From{' '}
            <span className="text-red-500">Problems</span>{' '}
            to{' '}
            <span className="text-green-600">Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the challenges restaurants face every day. 
            That's why we built a solution that addresses each problem directly.
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
              The Problems
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
              Our Solutions
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
            Transform Your Restaurant Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}