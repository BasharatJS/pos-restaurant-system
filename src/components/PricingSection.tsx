'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

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

  const pricingPlans = [
    {
      name: 'Starter',
      price: 2999,
      yearlyPrice: 29990,
      subtitle: 'Perfect for small restaurants (1-5 tables)',
      popular: false,
      color: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      features: [
        { text: 'Up to 2 devices', included: true },
        { text: 'Basic menu management', included: true },
        { text: 'Order processing', included: true },
        { text: 'Basic reports', included: true },
        { text: 'Email support', included: true },
        { text: 'GST billing', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Inventory management', included: false }
      ]
    },
    {
      name: 'Professional',
      price: 5999,
      yearlyPrice: 59990,
      subtitle: 'Ideal for growing restaurants (6-25 tables)',
      popular: true,
      color: 'border-green-500 ring-2 ring-green-200',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      features: [
        { text: 'Up to 10 devices', included: true },
        { text: 'Advanced menu management', included: true },
        { text: 'Complete order workflow', included: true },
        { text: 'Detailed analytics', included: true },
        { text: 'Inventory tracking', included: true },
        { text: 'Staff management', included: true },
        { text: 'Priority support', included: true },
        { text: 'Custom reports', included: true },
        { text: 'Multi-location support', included: false }
      ]
    },
    {
      name: 'Enterprise',
      price: 12999,
      yearlyPrice: 129990,
      subtitle: 'For restaurant chains (25+ tables/multiple locations)',
      popular: false,
      color: 'border-purple-500',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      features: [
        { text: 'Unlimited devices', included: true },
        { text: 'Multi-location management', included: true },
        { text: 'Advanced analytics & AI insights', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: '24/7 phone support', included: true },
        { text: 'Custom training', included: true },
        { text: 'API access', included: true }
      ]
    }
  ];

  const valueProps = [
    { icon: '💵', title: 'ROI Calculator', description: 'Save ₹15,000+ monthly on operational efficiency' },
    { icon: '🆓', title: '14-day Free Trial', description: 'No credit card required' },
    { icon: '📞', title: 'Free Setup & Training', description: 'Get started with expert guidance' },
    { icon: '🔄', title: 'Cancel Anytime', description: 'No long-term contracts' }
  ];

  const comparisonFeatures = [
    { feature: 'Tables', starter: 'Up to 5', professional: 'Up to 25', enterprise: 'Unlimited' },
    { feature: 'Devices', starter: '2', professional: '10', enterprise: 'Unlimited' },
    { feature: 'Users', starter: '3', professional: '15', enterprise: 'Unlimited' },
    { feature: 'Reports', starter: 'Basic', professional: 'Advanced', enterprise: 'Custom' },
    { feature: 'Support', starter: 'Email', professional: 'Priority', enterprise: '24/7 Phone' }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Choose Your{' '}
            <span className="text-green-600">Perfect</span>{' '}
            <span className="text-yellow-500">Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From small cafes to restaurant chains, we have the right solution 
            for your business needs and budget.
          </p>

          {/* Billing Toggle */}
          <motion.div 
            className="flex items-center justify-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className={`font-semibold ${!isYearly ? 'text-green-600' : 'text-gray-500'}`}>
              Monthly
            </span>
            <motion.button
              className="relative w-16 h-8 bg-green-200 rounded-full p-1 cursor-pointer"
              onClick={() => setIsYearly(!isYearly)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 bg-green-600 rounded-full shadow-lg"
                animate={{ x: isYearly ? 32 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            <span className={`font-semibold ${isYearly ? 'text-green-600' : 'text-gray-500'}`}>
              Yearly
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">
                Save 20%
              </span>
            </span>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all ${plan.color} ${
                plan.popular ? 'transform scale-105' : ''
              }`}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-2 rounded-full font-bold text-sm"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  ⭐ Most Popular
                </motion.div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.subtitle}</p>
                
                <div className="mb-6">
                  <motion.div
                    key={isYearly ? 'yearly' : 'monthly'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-4xl font-bold text-gray-800">
                      ₹{isYearly ? (plan.yearlyPrice / 12).toLocaleString() : plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">/month</span>
                    {isYearly && (
                      <div className="text-sm text-green-600 font-semibold">
                        Billed annually (₹{plan.yearlyPrice.toLocaleString()})
                      </div>
                    )}
                  </motion.div>
                </div>

                <motion.button
                  className={`w-full py-3 px-6 rounded-full font-semibold text-white transition-colors ${plan.buttonColor}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </div>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: featureIndex * 0.1 }}
                  >
                    <span className={`text-xl ${feature.included ? 'text-green-500' : 'text-red-400'}`}>
                      {feature.included ? '✅' : '🚫'}
                    </span>
                    <span className={`${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                      {feature.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Value Propositions */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className="text-3xl mb-4">{prop.icon}</div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">{prop.title}</h4>
              <p className="text-gray-600 text-sm">{prop.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table Toggle */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={() => setShowComparison(!showComparison)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showComparison ? 'Hide' : 'Show'} Detailed Comparison
          </motion.button>
        </motion.div>

        {/* Comparison Table */}
        {showComparison && (
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold text-gray-800">Feature</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-800">Starter</th>
                    <th className="px-6 py-4 text-center font-bold text-green-600">Professional</th>
                    <th className="px-6 py-4 text-center font-bold text-purple-600">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{row.starter}</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">{row.professional}</td>
                      <td className="px-6 py-4 text-center text-purple-600 font-semibold">{row.enterprise}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Final CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="bg-gradient-to-r from-green-600 to-yellow-500 text-white px-12 py-4 rounded-full font-bold text-xl hover:from-green-700 hover:to-yellow-600 transition-all shadow-xl"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Free Trial Today
          </motion.button>
          <p className="text-gray-600 mt-4">No credit card required • Setup in 5 minutes</p>
        </motion.div>
      </div>
    </section>
  );
}