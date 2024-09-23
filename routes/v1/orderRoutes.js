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
} = require('../../controllers/orderController'); // Import all required functions
const { protect } = require('../../middlewares/authMiddleware'); // Protect routes
const multer = require('multer');
const upload = multer(); 

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
  .put(protect, async (req, res, next) => {
    try {
      const { paymentStatus } = req.body;
      const result = await updatePaymentStatus(req.params.id, paymentStatus);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

// Route to update shipping details for a specific order
router.route('/:id/shipping-details')
  .put(protect, async (req, res, next) => {
    try {
      const { shippingDetails } = req.body;
      const result = await updateShippingDetails(req.params.id, shippingDetails);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

// Route to track a specific order by ID
router.route('/:id/track')
  .get(protect, async (req, res, next) => {
    try {
      const result = await trackOrder(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

// Route to cancel a specific order by ID
router.route('/:id/cancel')
  .put(protect, async (req, res, next) => {
    try {
      const result = await cancelOrder(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

// Route to get order history for a user
router.route('/history/:userId')
  .get(protect, async (req, res, next) => {
    try {
      const result = await getOrderHistory(req.params.userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

// Route to mark an order as delayed by ID
router.route('/:id/delay')
  .put(protect, async (req, res, next) => {
    try {
      const result = await markOrderAsDelayed(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
