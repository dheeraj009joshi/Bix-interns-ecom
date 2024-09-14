const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../../controllers/orderController');
const { protect } = require('../../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer(); 
const router = express.Router();

router.route('/')
  .get(protect, getOrders)
  .post( protect,upload.any(),createOrder);

router.route('/:id')
  .get(protect, getOrder)
  .put(protect,upload.any(), updateOrder)
  .delete(protect, deleteOrder);


module.exports = router;
