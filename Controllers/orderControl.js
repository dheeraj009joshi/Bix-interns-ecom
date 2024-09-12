const Order = require('../Models/order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);  // Create a new order from request body
    await order.save();  // Save the order to the database
    res.status(201).json({ success: true, data: order });  // Return the created order
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user items.product');  // Fetch all orders, populate user and product references
    res.status(200).json({ success: true, data: orders });  // Return all orders
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user items.product');  // Find order by ID and populate references
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });  // Return the found order
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status by ID
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Update order by ID
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });  // Return updated order
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);  // Delete order by ID
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted successfully' });  // Confirm deletion
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

