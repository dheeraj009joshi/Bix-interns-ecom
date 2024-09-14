const express = require('express');
const multer = require('multer');
const upload = multer(); 
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../../controllers/productController');
const { protect } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getProducts)
  .post(protect,upload.any(),createProduct);

router.route('/:id')
  .get(protect,getProduct)
  .put(protect,upload.any(),updateProduct)
  .delete( protect,deleteProduct);
module.exports = router;
