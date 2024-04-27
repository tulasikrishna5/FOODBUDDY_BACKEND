const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    cartitemId: {
        type: String,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    //this value will be taken from Job model
    itemid: {
        type: Number,
        required: true
    },
    itemname:{
        type: String,
        required:true
    },
    pic:{
        type:String,
        required:true
    },
    itemnumber:{
        type:Number,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    
    customeremail: {
        type: String,
        required: true
    },
   
   
});

const Cart = mongoose.model('Cart',CartSchema );

function generateRandomId() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "J" + randomNumber;
}

module.exports = Cart;