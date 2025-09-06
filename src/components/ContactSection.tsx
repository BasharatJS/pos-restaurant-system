'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    restaurantName: '',
    yourName: '',
    email: '',
    phone: '',
    restaurantType: '',
    numTables: '',
    challenges: '',
    preferredTime: '',
    message: ''
  });

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

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

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'evonnexis@gmail.com', href: 'mailto:evonnexis@gmail.com' },
    { icon: '📞', label: 'Phone', value: '+91-8697805501', href: 'tel:+918697805501' },
    { icon: '💬', label: 'WhatsApp', value: '+91-8697805501', href: 'https://wa.me/918697805501' },
    { icon: '🏢', label: 'Address', value: '106, PB Ghat Road, Kamarhati, Kolkata - 58', href: null }
  ];

  const supportOptions = [
    {
      icon: '📚',
      title: 'Knowledge Base',
      description: 'Self-help articles and guides',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Monday-Saturday, 9 AM - 7 PM',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: '🎥',
      title: 'Video Support',
      description: 'Screen sharing for technical issues',
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: '📱',
      title: 'WhatsApp Support',
      description: 'Quick queries and updates',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const locations = [
    { city: 'Delhi NCR', office: 'Noida Office', label: 'Headquarters', icon: '🏢' },
    { city: 'Mumbai', office: 'Andheri Business Hub', label: 'Western Region', icon: '🏢' },
    { city: 'Bangalore', office: 'Koramangala Tech Center', label: 'Southern Region', icon: '🏢' },
    { city: 'Chennai', office: 'Anna Nagar Branch', label: 'Tamil Nadu', icon: '🏢' }
  ];

  const faqs = [
    {
      question: 'How long does setup take?',
      answer: 'Usually 2-4 hours including comprehensive training for all staff members.'
    },
    {
      question: 'Do you provide training?',
      answer: 'Yes, we provide comprehensive training for all staff levels including hands-on practice sessions.'
    },
    {
      question: 'What if internet goes down?',
      answer: 'Our offline mode ensures operations continue seamlessly, and data syncs automatically when connection is restored.'
    },
    {
      question: 'Can we customize the menu?',
      answer: 'Absolutely! Fully customizable with images, descriptions, pricing, and categories to match your brand.'
    },
    {
      question: 'Is customer data secure?',
      answer: 'Yes, we use bank-level encryption and secure cloud storage with regular backups and security audits.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Get{' '}
            <span className="text-blue-600">In</span>{' '}
            <span className="text-green-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your restaurant? Let's discuss how our POS system 
            can revolutionize your operations and boost your business.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl"
              variants={itemVariants}
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Let's Transform Your{' '}
                <span className="text-green-600">Restaurant</span>{' '}
                Together
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Restaurant Name*
                    </label>
                    <input
                      type="text"
                      name="restaurantName"
                      value={formData.restaurantName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      placeholder="Your restaurant name"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Your Name*
                    </label>
                    <input
                      type="text"
                      name="yourName"
                      value={formData.yourName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      placeholder="Your full name"
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      placeholder="+91-XXXXXXXXXX"
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Restaurant Type
                    </label>
                    <select
                      name="restaurantType"
                      value={formData.restaurantType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    >
                      <option value="">Select type</option>
                      <option value="qsr">QSR (Quick Service)</option>
                      <option value="casual">Casual Dining</option>
                      <option value="fine">Fine Dining</option>
                      <option value="cloud">Cloud Kitchen</option>
                    </select>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Number of Tables*
                    </label>
                    <input
                      type="number"
                      name="numTables"
                      value={formData.numTables}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      placeholder="e.g., 15"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Current Challenges
                  </label>
                  <textarea
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    placeholder="Tell us about your current operational challenges..."
                  />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Preferred Demo Time
                    </label>
                    <input
                      type="datetime-local"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      placeholder="Any specific requirements or questions?"
                    />
                  </motion.div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-lg font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message 🚀
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-800">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-green-600 hover:text-green-700 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Support Options */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-xl"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Support Options</h3>
              <div className="grid grid-cols-2 gap-4">
                {supportOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl bg-gradient-to-r ${option.color} text-white text-center`}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <h4 className="font-bold mb-1">{option.title}</h4>
                    <p className="text-sm opacity-90">{option.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Office Locations */}
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
            Serving Restaurants Across India
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4">{location.icon}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{location.city}</h4>
                <p className="text-gray-600 mb-1">{location.office}</p>
                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {location.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
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
            Frequently Asked Questions
          </motion.h3>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                variants={itemVariants}
              >
                <motion.button
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-800">{faq.question}</h4>
                    <motion.span
                      className="text-2xl text-green-600"
                      animate={{ rotate: expandedFAQ === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      +
                    </motion.span>
                  </div>
                </motion.button>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: expandedFAQ === index ? 'auto' : 0,
                    opacity: expandedFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTAs */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            Ready to Get Started?
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto">
            <motion.button
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-xl whitespace-nowrap"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)' }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 Start Your Free Trial
            </motion.button>
            
            <motion.button
              className="border-2 border-green-600 text-green-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-600 hover:text-white transition-all whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📞 Schedule a Call
            </motion.button>
            
            <motion.button
              className="bg-gray-100 text-gray-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💬 Chat with Sales
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}