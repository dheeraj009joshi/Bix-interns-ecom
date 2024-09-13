const { json } = require('body-parser');
const Order = require('../Models/Order');



exports.createOder = async (req, res, next)=>{

    try{

        const oder=  await Order.create(req.body);
        res.status(201).json( {success: true, data: oder})
    }catch (error){
        console.log.apply(error)
        next(error) // sending error the handler
    }
   
};

// Get all orders
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();  // Fetch all orders
    res.status(200).json({ success: true, data: orders });  // Return all orders
  } catch (error) {
    next(error);  // Pass error to the handler
  }
};

exports.getOrderById = async (req, res, next)=>{
    try{
        const oder=  await Order.findById(req.params.id);
        res.status(200).json( {success: true, data: oder, message:"Oder found"})
    }catch (error){
        console.log.apply(error)
        next(error) // sending error the handler
    }
   
};

// Update an order by ID
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });  // Return updated order
  } catch (error) {
    next(error);  // Pass error to the handler
  }
};

// Delete an order by ID
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);  // Delete order by ID
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted successfully' });  // Confirm deletion
  } catch (error) {
    next(error);  // Pass error to the handler
  }
};

