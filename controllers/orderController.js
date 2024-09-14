const Order = require("../models/order");



// Create a new Order
exports.createOrder = async (req, res, next) => {
  try {
    
    const order= Order.create(req.body);
    res.status(201).json({success:true, data:order})
}catch(error){
  console.error('Error in getOrder:', error);
  next(error)
}};

// Get a single Order by ID
exports.getOrder = async (req, res, next) => {
  try {
    const Order = await Order.findById(req.params.id);
    if (!Order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: Order });
  } catch (error) {
    console.error('Error in getOrder:', error);
    next(error);
  }
};
// Get all  Order 
exports.getOrders = async (req, res, next) => {
  try {
    const Order = await Order.find();
    if (!Order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: Order });
  } catch (error) {
    console.error('Error in getOrder:', error);
    next(error);
  }
};

// Update a Order by ID
exports.updateOrder = async (req, res, next) => {
  try {
    const updatedFIelds = req.body;

    const Order = await Order.findById(req.params.id);
    if (!Order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
      updatedFIelds
    }, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error('Error in updateOrder:', error);
    next(error);
  }
};

// Delete a Order by ID
exports.deleteOrder = async (req, res, next) => {
  try {
    const Order = await Order.findByIdAndDelete(req.params.id);
    if (!Order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error in deleteOrder:', error);
    next(error);
  }
};
