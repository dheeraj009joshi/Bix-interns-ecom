const Order = require('../models/order');

exports.placeOrder = async (orderData) => {
    try {
        // Validation logic like payment and address validation can be placed here
        const order = await Order.create(orderData); // create the order in the database
        return { success: true, data: order };//success return date and time
    } catch (error) {
        console.error('Error in placeOrder:', error);
        throw new Error('Order could not be placed');
    }
};

exports.getOrderSummary = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        return { success: true, data: order };
    } catch (error) {
        console.error('Error in getOrderSummary:', error);
        throw new Error('Order summary could not be fetched');
    }
};

exports.trackOrder = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        // Return the status and tracking info
        return { success: true, status: order.status, shipment: order.shipment };
    } catch (error) {
        console.error('Error in trackOrder:', error);
        throw new Error('Order could not be tracked');
    }
};


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

exports.getOrderHistory = async (userId) => {
    try {
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return { success: true, data: orders };
    } catch (error) {
        console.error('Error in getOrderHistory:', error);
        throw new Error('Order history could not be fetched');
    }
};
