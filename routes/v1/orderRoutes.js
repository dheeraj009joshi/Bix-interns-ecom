const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  updatePaymentStatus,
  updateShippingDetails,
  trackOrder,
  cancelOrder,
  getOrderHistory,
  markOrderAsDelayed
} = require('../../controllers/orderController'); // Import required functions
const { protect } = require('../../middlewares/authMiddleware'); // Protect routes
const multer = require('multer');
const upload = multer(); // Initialize multer for handling file uploads

const router = express.Router();

// Route for getting all orders and creating a new order
router.route('/')
  .get(protect, getOrders) // Get all orders
  .post(protect, upload.any(), createOrder); // Create a new order

// Route for a specific order (by ID)
router.route('/:id')
  .get(protect, getOrder) // Get a specific order by ID
  .put(protect, upload.any(), updateOrder) // Update a specific order by ID
  .delete(protect, deleteOrder); // Delete a specific order by ID

// Route to update payment status for a specific order
router.route('/:id/payment-status')
  .put(protect, updatePaymentStatus); // Update payment status of a specific order

// Route to update shipping details for a specific order
router.route('/:id/shipping-details')
  .put(protect, updateShippingDetails); // Update shipping details for a specific order

// Route to track a specific order by ID
router.route('/:id/track')
  .get(protect, trackOrder); // Track a specific order

// Route to cancel a specific order by ID
router.route('/:id/cancel')
  .put(protect, cancelOrder); // Cancel a specific order

// Route to get order history for a user
router.route('/history/:userId')
  .get(protect, getOrderHistory); // Get order history for a user

// Route to mark an order as delayed by ID
router.route('/:id/delay')
  .put(protect, markOrderAsDelayed); // Mark an order as delayed

module.exports = router;
