const mongoose = require('mongoose'); //import mongodb
const Schema = mongoose.Schema;

// Define the schema for the Order model
const OrderSchema = new Schema({//Creating Array of Objects
    user: {//Defining user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing to user
        required: true
    },
    items: [//Defining items such as type of product, availability and price
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,//Unique Id
                ref: 'Product', 
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        pin: { type: String, required: true },
        country: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        enum: ['Paytm', 'AmazonPay', 'Wallet',' UPI', 'Debit Card', 'Credit Card', 'Cash on Delivery'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed',' Try Again'],
        default: 'Pending'
    },
    paymentDetails: {
        transactionId: String,
        paymentDate: Date
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Processing'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    shippingDate: Date,
    deliveryDate: Date,
    review: {
        type: String,
        images: String 
});

// Pre-save hook to calculate total price before saving
OrderSchema.pre('save', function (next) {//Pre-save Middleware
    const order = this;
    order.totalPrice = order.items.reduce((total, item) => total + item.quantity * item.price, 0);
    next();
});

module.exports = mongoose.model('Order', OrderSchema);
