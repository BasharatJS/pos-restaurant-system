'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface HeaderProps {
  onLoginClick: () => void;
}

export default function Header({ onLoginClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['Home', 'Features', 'Demo', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full bg-white shadow-lg z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex flex-col"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <motion.div
                className="text-3xl font-bold text-green-600"
                animate={{
                  color: ['#059669', '#0ea5e9', '#8b5cf6', '#059669'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Spice
              </motion.div>
              <motion.div
                className="text-3xl font-bold text-yellow-500"
                animate={{
                  color: ['#eab308', '#059669', '#f59e0b', '#eab308'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                Garden
              </motion.div>
            </div>
            <motion.div
              className="text-sm font-medium text-gray-600 -mt-1"
              whileHover={{
                color: '#059669',
                scale: 1.05
              }}
              transition={{ duration: 0.3 }}
            >
              Restaurant
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors relative"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            
            <motion.button
              onClick={onLoginClick}
              className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              Login
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                className="w-full h-0.5 bg-gray-700 mb-1"
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-700 mb-1"
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-gray-700"
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -4 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white shadow-lg rounded-lg mt-4"
        >
          <div className="py-4 px-4 space-y-4">
            {navItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                whileHover={{ x: 10 }}
              >
                {item}
              </motion.button>
            ))}
            <motion.button
              onClick={onLoginClick}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}