const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../Controllers/productControllers');  // Import product controller methods

const protect = require('../Middlewares/auth');

// Route to handle product creation and fetching all products
router.route('/')
      .get( getAllProducts)   // Get all products 
      .post(createProduct);  // Create a new product

// Route to handle operations on a specific product by ID
router.route('/:id')
      .get( getProductById)  
      .patch( updateProduct)  
      .put( updateProduct)  
      .delete(deleteProduct);  

module.exports = router;




