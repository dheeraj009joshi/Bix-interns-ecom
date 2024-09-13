const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    Orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],

    Cart : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }]

});

module.exports = mongoose.model('User', UserSchema);
