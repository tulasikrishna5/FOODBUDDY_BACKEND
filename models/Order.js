const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    itemid: {
        type: Number,
        required: true
    },
    itemname: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    itemnumber: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        required: true
    },
    items: [OrderItemSchema], // Array of OrderItemSchema objects
    totalprice: {
        type: Number,
        required: true
    },
    totalquantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
       
    },
    customeremail: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
