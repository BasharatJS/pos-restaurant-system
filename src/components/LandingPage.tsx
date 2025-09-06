'use client';

import { useState } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import ProblemSolutionSection from './ProblemSolutionSection';
import FeaturesSection from './FeaturesSection';
import PricingSection from './PricingSection';
import DemoSection from './DemoSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import LoginForm from './LoginForm';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleBackToLanding = () => {
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {showLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen"
          >
            <div className="absolute top-4 left-4 z-10">
              <motion.button
                onClick={handleBackToLanding}
                className="bg-white text-gray-700 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back to Home
              </motion.button>
            </div>
            <LoginForm />
          </motion.div>
        ) : (
          <motion.div
            key="landing"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
          >
            <Header onLoginClick={handleLoginClick} />
            <HeroSection />
            <ProblemSolutionSection />
            <FeaturesSection />
            <PricingSection />
            <DemoSection />
            <ContactSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}