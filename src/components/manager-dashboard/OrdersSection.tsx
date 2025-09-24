'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrders, Order } from '@/context/OrderContext';

// Payment Modal Component
const PaymentModal = ({
  isOpen,
  onClose,
  order,
  onPaymentComplete
}: {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onPaymentComplete: (orderId: string, paymentMethod: 'cash' | 'upi') => void;
}) => {
  const [selectedPayment, setSelectedPayment] = useState<'cash' | 'upi'>('cash');
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Reset state when modal closes or order changes
  React.useEffect(() => {
    if (!isOpen) {
      setShowReceipt(false);
      setPaymentCompleted(false);
      setSelectedPayment('cash');
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const handlePayment = () => {
    setPaymentCompleted(true);
    setShowReceipt(true);
    onPaymentComplete(order.id, selectedPayment);
  };

  const printReceipt = () => {
    const printWindow = window.open('', '_blank');
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${order.id}</title>
        <style>
          body { font-family: 'Courier New', monospace; margin: 20px; line-height: 1.4; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
          .title { font-size: 24px; font-weight: bold; }
          .subtitle { font-size: 14px; margin-top: 5px; }
          .section { margin: 15px 0; }
          .row { display: flex; justify-content: space-between; margin: 5px 0; }
          .item-row { display: flex; justify-content: space-between; border-bottom: 1px dotted #ccc; padding: 3px 0; }
          .total-row { font-weight: bold; font-size: 16px; border-top: 2px solid #000; padding-top: 8px; margin-top: 10px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; }
          .payment-info { background: #f5f5f5; padding: 10px; margin: 10px 0; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">🍽️ SPICE GARDEN RESTAURANT</div>
          <div class="subtitle">123 Main Street, City, State 12345</div>
          <div class="subtitle">Phone: +91 9876543210 | Email: info@spicegarden.com</div>
        </div>

        <div class="section">
          <div class="row"><span>Invoice #:</span><span>${order.id}</span></div>
          <div class="row"><span>Date:</span><span>${new Date().toLocaleDateString('en-IN')}</span></div>
          <div class="row"><span>Time:</span><span>${new Date().toLocaleTimeString('en-IN')}</span></div>
          <div class="row"><span>Table:</span><span>Table ${order.tableNumber}</span></div>
          <div class="row"><span>Waiter:</span><span>${order.waiterName}</span></div>
        </div>

        <div class="section">
          <h3 style="margin-bottom: 10px; border-bottom: 1px solid #000;">ORDER DETAILS</h3>
          ${order.items.map(item => `
            <div class="item-row">
              <span>${item.menuItem.name} x ${item.quantity}</span>
              <span>₹${item.total.toFixed(2)}</span>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="row"><span>Subtotal:</span><span>₹${order.total.toFixed(2)}</span></div>
          <div class="row"><span>CGST (9%):</span><span>₹${(order.total * 0.09).toFixed(2)}</span></div>
          <div class="row"><span>SGST (9%):</span><span>₹${(order.total * 0.09).toFixed(2)}</span></div>
          <div class="total-row">
            <span>TOTAL AMOUNT:</span>
            <span>₹${(order.total * 1.18).toFixed(2)}</span>
          </div>
        </div>

        <div class="payment-info">
          <div class="row"><span>Payment Method:</span><span>${selectedPayment.toUpperCase()}</span></div>
          <div class="row"><span>Payment Status:</span><span>PAID ✅</span></div>
        </div>

        ${order.notes ? `
          <div class="section">
            <strong>Special Notes:</strong><br>
            ${order.notes}
          </div>
        ` : ''}

        <div class="footer">
          <p>Thank you for dining with us!</p>
          <p>Visit us again soon! 🙏</p>
          <p style="margin-top: 15px;">This is a computer generated invoice.</p>
        </div>
      </body>
      </html>
    `;

    if (printWindow) {
      printWindow.document.write(receiptHTML);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {!showReceipt ? (
          // Payment Selection Screen
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">💳 Process Payment</h2>
              <p className="text-gray-600">Order #{order.id} • Table {order.tableNumber}</p>
              <p className="text-3xl font-bold text-green-600 mt-2">₹{(order.total * 1.18).toFixed(2)}</p>
              <p className="text-sm text-gray-500">(Including 18% GST)</p>
            </div>

            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-800">Select Payment Method:</h3>

              <motion.button
                onClick={() => setSelectedPayment('cash')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedPayment === 'cash'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💵</span>
                  <div className="text-left">
                    <p className="font-semibold">Cash Payment</p>
                    <p className="text-sm opacity-75">Pay with cash directly</p>
                  </div>
                  {selectedPayment === 'cash' && (
                    <span className="ml-auto text-green-500">✓</span>
                  )}
                </div>
              </motion.button>

              <motion.button
                onClick={() => setSelectedPayment('upi')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedPayment === 'upi'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📱</span>
                  <div className="text-left">
                    <p className="font-semibold">UPI Payment</p>
                    <p className="text-sm opacity-75">Pay via PhonePe, GPay, Paytm</p>
                  </div>
                  {selectedPayment === 'upi' && (
                    <span className="ml-auto text-blue-500">✓</span>
                  )}
                </div>
              </motion.button>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="flex-1 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
              >
                Process Payment
              </button>
            </div>
          </div>
        ) : (
          // Receipt Screen
          <div className="p-8">
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-white text-2xl">✓</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
              <p className="text-gray-600">Invoice generated for Order #{order.id}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Order Total:</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span>₹{(order.total * 0.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Final Amount:</span>
                  <span>₹{(order.total * 1.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="capitalize font-semibold">{selectedPayment}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={printReceipt}
                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V9a2 2 0 00-2-2H9a2 2 0 00-2 2v.01M15 15v.01"/>
                </svg>
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const OrdersSection: React.FC = () => {
  const { orders, updateOrderStatus, updateOrderPayment } = useOrders();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState<Order | null>(null);

  // Debug logging
  useEffect(() => {
    console.log('🟡 MANAGER DASHBOARD - OrdersSection mounted');
    console.log('🟡 Current orders from context:', orders.length);
    console.log('🟡 Orders details:', orders.map(o => ({ id: o.id, table: o.tableNumber, status: o.status, waiter: o.waiterName })));

    // Check localStorage directly
    const storedOrders = localStorage.getItem('restaurant-orders');
    console.log('🟡 MANAGER DASHBOARD - Direct localStorage check:', storedOrders);
    if (storedOrders) {
      const parsed = JSON.parse(storedOrders);
      console.log('🟡 MANAGER DASHBOARD - localStorage orders count:', parsed.length);
    }
  }, [orders]);


  // Aggressive localStorage monitoring
  useEffect(() => {
    let lastOrderCount = orders.length;

    const interval = setInterval(() => {
      const savedOrders = localStorage.getItem('restaurant-orders');
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        console.log('🟡 PERIODIC CHECK - localStorage orders:', parsedOrders.length, 'context orders:', orders.length);

        if (parsedOrders.length !== lastOrderCount) {
          console.log('🟡 DETECTED NEW ORDERS - Forcing context reload');
          lastOrderCount = parsedOrders.length;

          // Force trigger storage event to update context
          const event = new StorageEvent('storage', {
            key: 'restaurant-orders',
            newValue: savedOrders,
            oldValue: null,
            storageArea: localStorage,
            url: window.location.href
          });
          window.dispatchEvent(event);
        }
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: Order['status']) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const manualRefresh = () => {
    console.log('🟡 MANUAL REFRESH TRIGGERED');
    const savedOrders = localStorage.getItem('restaurant-orders');
    if (savedOrders) {
      console.log('🟡 Manual refresh - localStorage data:', savedOrders);
      const event = new StorageEvent('storage', {
        key: 'restaurant-orders',
        newValue: savedOrders,
        oldValue: null,
        storageArea: localStorage,
        url: window.location.href
      });
      window.dispatchEvent(event);
    } else {
      console.log('🟡 Manual refresh - No localStorage data found');
    }
  };

  const clearOldOrders = () => {
    localStorage.removeItem('restaurant-orders');
    console.log('🟡 CLEARED OLD ORDERS FROM LOCALSTORAGE');
    window.location.reload();
  };

  const handlePaymentClick = (order: Order) => {
    setSelectedOrderForPayment(order);
    setPaymentModalOpen(true);
  };

  const handlePaymentComplete = async (orderId: string, paymentMethod: 'cash' | 'upi') => {
    console.log(`💳 Payment completed for order ${orderId} via ${paymentMethod}`);

    // Update local state immediately for better UX using context function
    updateOrderPayment(orderId, paymentMethod);

    // Update order status to completed in Firebase
    try {
      await updateOrderStatus(orderId, 'completed');
      console.log(`🔥 Order ${orderId} status updated to completed in Firebase`);
    } catch (error) {
      console.error('🔥 Error updating order status in Firebase:', error);
    }

    // Close the payment modal
    setPaymentModalOpen(false);
    setSelectedOrderForPayment(null);
  };

  // Show all orders without filtering

  const statusOptions: {
    value: 'all' | Order['status'];
    label: string;
    color: string;
    bgColor: string;
    textColor: string;
    icon: string;
  }[] = [
    {
      value: 'all',
      label: 'All Orders',
      color: 'from-slate-500 to-slate-600',
      bgColor: 'bg-slate-500',
      textColor: 'text-slate-700',
      icon: '📋'
    },
    {
      value: 'pending',
      label: 'Pending',
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500',
      textColor: 'text-amber-700',
      icon: '⏳'
    },
    {
      value: 'preparing',
      label: 'Preparing',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-700',
      icon: '👨‍🍳'
    },
    {
      value: 'ready',
      label: 'Ready',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500',
      textColor: 'text-orange-700',
      icon: '🔔'
    },
    {
      value: 'served',
      label: 'Served',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500',
      textColor: 'text-purple-700',
      icon: '🍽️'
    },
    {
      value: 'completed',
      label: 'Completed',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500',
      textColor: 'text-green-700',
      icon: '✅'
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500',
      textColor: 'text-red-700',
      icon: '❌'
    }
  ];

  const getStatusBadgeStyle = (status: Order['status']) => {
    const statusConfig = statusOptions.find(opt => opt.value === status);
    return statusConfig ? {
      bg: statusConfig.bgColor,
      text: 'text-white'
    } : { bg: 'bg-gray-500', text: 'text-white' };
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">📋 Order Management</h1>
            <p className="text-indigo-100 text-lg">
              Track and manage all restaurant orders • {orders.length} orders
            </p>
          </div>
          <div className="text-right space-y-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold">{orders.length}</p>
              <p className="text-sm opacity-90">Total Orders</p>
            </div>
            <div className="space-y-2">
              <button
                onClick={manualRefresh}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 border border-white/20"
              >
                🔄 Refresh Orders
              </button>
              <button
                onClick={clearOldOrders}
                className="w-full bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 border border-red-300/20"
              >
                🗑️ Clear Old Orders
              </button>
            </div>
          </div>
        </div>
      </motion.div>


      {/* Orders Content */}
      <AnimatePresence mode="wait">
        {orders.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center shadow-inner"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="text-8xl mb-6"
            >
              📋
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">No orders found</h3>
            <p className="text-gray-600 text-lg mb-6">
              Orders will appear here when waiters complete checkout
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-500">Waiting for</p>
                <p className="font-semibold text-gray-800">New Orders</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-500">Real-time</p>
                <p className="font-semibold text-gray-800">Updates</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="orders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-6"
          >
            {orders.map((order, index) => {
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="bg-indigo-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                          #{order.id.slice(-3)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-bold text-gray-800">Order {order.id}</h3>
                            {!order.paymentMethod && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                                💳 Payment Required
                              </span>
                            )}
                            {order.paymentMethod && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                                ✅ Paid via {order.paymentMethod.toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-gray-600 mt-1">
                            <span className="flex items-center space-x-1">
                              <span>🪑</span>
                              <span>Table {order.tableNumber}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>👨‍💼</span>
                              <span>{order.waiterName}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>🕐</span>
                              <span>{new Date(order.timestamp).toLocaleString()}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-gray-900 mb-2">₹{order.total.toLocaleString()}</p>
                        {/* Simple status display - no dropdown needed */}
                        <div className="text-sm text-gray-600 font-medium">
                          {order.paymentMethod ? (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                              ✅ Payment Completed
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                              🍽️ Ready for Payment
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-800 mb-4 text-lg">📝 Order Details</h4>
                    <div className="grid gap-3">
                      {order.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                              {item.quantity}
                            </div>
                            <span className="text-gray-800 font-medium">{item.menuItem.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{item.total.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">₹{item.menuItem.price} each</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {order.notes && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl"
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-lg">💬</span>
                          <div>
                            <p className="text-sm font-semibold text-yellow-800">Special Notes:</p>
                            <p className="text-yellow-700">{order.notes}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Payment Action Button - Show if payment not done yet */}
                    {!order.paymentMethod && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 pt-4 border-t border-gray-200"
                      >
                        <button
                          onClick={() => handlePaymentClick(order)}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <span className="text-2xl">💳</span>
                          <span className="text-lg">Process Payment</span>
                          <span className="text-lg">₹{order.total.toLocaleString()}</span>
                        </button>
                      </motion.div>
                    )}

                    {/* Payment Completed Status */}
                    {order.paymentMethod && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 pt-4 border-t border-gray-200"
                      >
                        <div className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-3">
                          <span className="text-2xl">✅</span>
                          <span className="text-lg">Payment Completed</span>
                          <span className="text-lg">₹{order.total.toLocaleString()}</span>
                          <span className="text-sm opacity-90">({order.paymentMethod.toUpperCase()})</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false);
          setSelectedOrderForPayment(null);
        }}
        order={selectedOrderForPayment}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
};

export default OrdersSection;