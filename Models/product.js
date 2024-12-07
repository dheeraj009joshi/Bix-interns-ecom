const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
    type: String, enum: ["Electronics", "Hardware","Cloths", "Gifts","Fashion", "Snacks"] ,
        required: true
    },
    ImageGallery: [{
        type: String,
       
    }],

    thumbnail:{type:String}
});

module.exports = mongoose.model('Product', ProductSchema);
