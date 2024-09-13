const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../Controllers/productControllers');  // Import product controller methods

const { protect } = require('../Middlewares/auth');  

// Route to handle product creation and fetching all products
app.route('/')
      .get(protect, getAllProducts)   // Get all products 
      .post(protect, createProduct);  // Create a new product

// Route to handle operations on a specific product by ID
app.route('/:id')
      .get(protect, getProductById)  
      .patch(protect, updateProduct)  
      .put(protect, updateProduct)  
      .delete(protect, deleteProduct);  

module.exports = router;




