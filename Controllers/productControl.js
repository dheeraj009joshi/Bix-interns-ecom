const { json } = require('body-parser');
const Product = require('../Models/product');
const Order= require('../Models/Order');

// Create a new product
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);  // Create product using `create`
    res.status(201).json({ success: true, data: product });  // Return created product
  } catch (error) {
    next(error);  // Pass error to the handler
  }
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();  // Get all products
    res.status(200).json({ success: true, data: products });  // Return all products
  } catch (error) {
    next(error);  // Pass error to the handler
  }
};

// Get a single product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);  // Find product by ID
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });  // Return found product
  } catch (error) {
    next(error);  // Pass error to the handler
  }
};

// Update a product by ID
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });  // Return updated product
  } catch (error) {
    next(error);  // Pass error to the handler
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);  // Delete product by ID
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });  // Confirm deletion
  } catch (error) {
    next(error);  // Pass error to the handler
  }
};
