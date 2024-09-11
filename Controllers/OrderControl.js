const Order = require('../Models/Order');
const createOrder = async (req, res) => {
    try {
        const { user, items, shippingAddress, paymentMethod } = req.body;
        const order = new Order({
            user,
            items,
            shippingAddress,
            paymentMethod,
            totalPrice: 0 
        });

        await order.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
};

module.exports = { createOrder };

