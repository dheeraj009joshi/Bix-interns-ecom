const Order = require('../models/order');

// Create a new order
exports.createOrder = async (req, res, next) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        console.error('Error in createOrder:', error);
        next(error);
    }
};

// Get a specific order by ID
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error('Error in getOrder:', error);
        next(error);
    }
};

// Get all orders
exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            return res.status(404).json({ success: false, message: 'Orders not found' });
        }
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error in getOrders:', error);
        next(error);
    }
};

// Update an order by ID
exports.updateOrder = async (req, res, next) => {
    try {
        const updatedFields = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, updatedFields, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        console.error('Error in updateOrder:', error);
        next(error);
    }
};

// Delete an order by ID
exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        console.error('Error in deleteOrder:', error);
        next(error);
    }
};

// Place a new order
exports.placeOrder = async (orderData) => {
    try {
        const order = await Order.create(orderData);
        return { success: true, data: order };
    } catch (error) {
        console.error('Error in placeOrder:', error);
        throw new Error('Order could not be placed');
    }
};

// Update the payment status of an order
exports.updatePaymentStatus = async (orderId, paymentStatus) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        order.paymentStatus = paymentStatus;
        await order.save();
        return { success: true, message: 'Payment status updated successfully' };
    } catch (error) {
        console.error('Error in updatePaymentStatus:', error);
        throw new Error('Payment status could not be updated');
    }
};

// Update shipping details
exports.updateShippingDetails = async (orderId, shippingDetails) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        order.shippingDetails = shippingDetails;
        await order.save();
        return { success: true, message: 'Shipping details updated successfully' };
    } catch (error) {
        console.error('Error in updateShippingDetails:', error);
        throw new Error('Shipping details could not be updated');
    }
};

// Track the status of an order
exports.trackOrder = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        return { success: true, status: order.status, shipment: order.shipment };
    } catch (error) {
        console.error('Error in trackOrder:', error);
        throw new Error('Order could not be tracked');
    }
};

// Cancel an order
exports.cancelOrder = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        if (order.status === 'shipped' || order.status === 'delivered') {
            throw new Error('Order cannot be canceled');
        }
        order.status = 'canceled';
        await order.save();
        return { success: true, message: 'Order canceled successfully' };
    } catch (error) {
        console.error('Error in cancelOrder:', error);
        throw new Error('Order could not be canceled');
    }
};

// Get order history for a user
exports.getOrderHistory = async (userId) => {
    try {
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return { success: true, data: orders };
    } catch (error) {
        console.error('Error in getOrderHistory:', error);
        throw new Error('Order history could not be fetched');
    }
};

// Mark an order as delayed
exports.markOrderAsDelayed = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        order.status = 'delayed';
        await order.save();
        return { success: true, message: 'Order marked as delayed' };
    } catch (error) {
        console.error('Error in markOrderAsDelayed:', error);
        throw new Error('Order could not be marked as delayed');
    }
};
