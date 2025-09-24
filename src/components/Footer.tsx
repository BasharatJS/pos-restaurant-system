'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

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

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#demo' },
    { name: 'Contact', href: '#contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Refund Policy', href: '#' }
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: '📘', 
      href: '#',
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Twitter', 
      icon: '🐦', 
      href: '#',
      color: 'hover:text-blue-400'
    },
    { 
      name: 'LinkedIn', 
      icon: '💼', 
      href: '#',
      color: 'hover:text-blue-700'
    },
    { 
      name: 'Instagram', 
      icon: '📷', 
      href: '#',
      color: 'hover:text-pink-500'
    },
    { 
      name: 'YouTube', 
      icon: '📺', 
      href: '#',
      color: 'hover:text-red-600'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid lg:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div 
              className="flex flex-col mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="text-4xl font-bold text-green-400"
                  animate={{
                    color: ['#4ade80', '#60a5fa', '#c084fc', '#4ade80'],
                    textShadow: [
                      '0 0 10px rgba(74, 222, 128, 0.5)',
                      '0 0 15px rgba(96, 165, 250, 0.5)',
                      '0 0 15px rgba(192, 132, 252, 0.5)',
                      '0 0 10px rgba(74, 222, 128, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Spice
                </motion.div>
                <motion.div
                  className="text-4xl font-bold text-yellow-400"
                  animate={{
                    color: ['#fbbf24', '#4ade80', '#60a5fa', '#fbbf24'],
                    textShadow: [
                      '0 0 10px rgba(251, 191, 36, 0.5)',
                      '0 0 15px rgba(74, 222, 128, 0.5)',
                      '0 0 15px rgba(96, 165, 250, 0.5)',
                      '0 0 10px rgba(251, 191, 36, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  Garden
                </motion.div>
              </div>
              <motion.div 
                className="text-lg font-medium text-gray-300 -mt-1"
                whileHover={{ 
                  color: '#4ade80',
                  scale: 1.05,
                  textShadow: '0 0 10px rgba(74, 222, 128, 0.8)'
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                animate={{
                  y: [0, -1, 0],
                  opacity: [0.9, 1, 0.9]
                }}
              >
                Restaurant
              </motion.div>
            </motion.div>
            
            <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-md">
              Experience authentic Indian cuisine with modern technology at Spice Garden Restaurant.
              Serving traditional recipes with contemporary dining excellence since 2018.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-8">
              <h4 className="text-xl font-bold mb-4 text-green-400">
                📧 Special Offers & Updates
              </h4>
              <p className="text-gray-300 mb-4">
                Subscribe to receive exclusive offers, seasonal menus, and event updates.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-green-400">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`text-2xl transition-colors ${social.color}`}
                    whileHover={{ scale: 1.3, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6 text-green-400">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-green-400 transition-colors block w-full text-left"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.button>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-xl font-bold mb-6 text-green-400">
                Support
              </h4>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a href="mailto:info@spicegarden.com" className="text-gray-300 hover:text-green-400 transition-colors">
                    📧 Email Us
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="tel:+919876543210" className="text-gray-300 hover:text-green-400 transition-colors">
                    📞 Reservations
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="https://wa.me/919876543211" className="text-gray-300 hover:text-green-400 transition-colors">
                    💬 WhatsApp Orders
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold mb-6 text-green-400">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors block"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <h4 className="text-xl font-bold mb-6 text-green-400">
                Resources
              </h4>
              <ul className="space-y-3">
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    📚 Documentation
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    🎥 Video Tutorials
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    📖 Blog
                  </a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                    ❓ FAQ
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-700 mt-12 pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-center md:text-left">
              <p className="mb-2">
                © 2024 Spice Garden Restaurant. All rights reserved.
              </p>
              <p className="text-sm">
                Serving authentic Indian cuisine • MG Road, Connaught Place, New Delhi
              </p>
            </div>

            <motion.div 
              className="flex items-center space-x-6 text-gray-400 text-sm"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="flex items-center space-x-2"
                variants={itemVariants}
              >
                <span>🔒</span>
                <span>SSL Secured</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                variants={itemVariants}
              >
                <span>☁️</span>
                <span>Cloud Hosted</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                variants={itemVariants}
              >
                <span>🇮🇳</span>
                <span>Made in India</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      {/* <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" /> */}
      
      {/* Floating Animation Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-green-500/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 bg-blue-500/10 rounded-full"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </footer>
  );
}