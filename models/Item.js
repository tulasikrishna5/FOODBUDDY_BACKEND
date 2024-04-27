const mongoose = require('mongoose');


const itemschema = new mongoose.Schema({
    itemid: {
        type: Number,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    Restaurantname: {
        type: String,
        required: true
    },
    Diettype:
    {
        type:String,
        required:true
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
              return value >= 1;
            },
            message: 'Price must be at least 1 Ruppee'
          }
    },
    pic: { 
        type: String,
        required: true
    },
    restaurantowner: {
        type: Object,
        required: true
    }
});

const item = mongoose.model('Item', itemschema);

function generateRandomId() {
    return Math.floor(Math.random() * 900000) + 100000;
}

module.exports = item;