'use client';


import { motion } from 'framer-motion';

export default function HeroSection() {
  const benefits = [
    {
      icon: '🍽️',
      title: 'Authentic Indian Cuisine',
      description: 'Traditional recipes with modern dining experience'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast Service',
      description: 'Digital ordering ensures your meal arrives quickly'
    },
    {
      icon: '👨‍🍳',
      title: 'Expert Culinary Team',
      description: 'Professional chefs creating memorable dining experiences'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  return (
    <section id="home" className="min-h-screen pt-20 bg-white" >
      <div className="container mx-auto px-4 py-20 bg-white" >
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Hero Headline */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight"
            variants={itemVariants}
          >
            Welcome to{' '}
            <span className="text-green-600">Spice Garden</span>{' '}
            Restaurant's{' '}
            <span className="text-yellow-500">Digital</span>{' '}
            Experience
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Experience seamless dining with our state-of-the-art POS system.
            From table selection to order completion - everything made simple for our valued guests and efficient staff.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={itemVariants}
          >
            <motion.button
              className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Table
            </motion.button>
            <motion.button
              className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 hover:text-white transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Menu
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Benefits Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all border border-gray-100"
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 text-lg">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="text-center bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-sm border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-2xl font-bold text-gray-800 mb-6"
            variants={itemVariants}
          >
            Loved by customers since 2018 • Serving authentic flavors in the heart of the city
          </motion.h3>

          <motion.div
            className="flex justify-center items-center space-x-2 text-yellow-400 text-2xl mb-4"
            variants={itemVariants}
          >
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 1 }}
              >
                ⭐
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="text-xl text-gray-700 font-semibold"
            variants={itemVariants}
          >
            4.9/5 rating from 2,500+ satisfied customers
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}