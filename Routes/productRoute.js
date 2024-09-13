const express = require('express');
const router = express.Router();

const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../Controllers/productControl');  // Import product controller methods

const { protect } = require('../Middlewares/auth');  

// Route to handle product creation and fetching all products
app.route('/')
      .get(protect, getAllProducts)   // Get all products 
      .post(protect, createProduct);  // Create a new product

// Route to handle operations on a specific product by ID
app.route('/:id')
      .get(protect, getProductById)   // Get a specific product by ID 
      .patch(protect, updateProduct)  // Partially update product by ID 
      .put(protect, updateProduct)    // Fully update a product by ID 
      .delete(protect, deleteProduct); // Delete a product by ID 

module.exports = router;




