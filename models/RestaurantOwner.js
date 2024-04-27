const mongoose = require("mongoose")

const restaurantownerschema = new mongoose.Schema({
    fullname: {
      type: String,
      required: true
    },
    restaurantname: {
        type: String,
        required:true,
   },
   gender: {
    type: String,
    required:true,
    enum: ['male', 'female', 'others']
  },
    
    dateofbirth: {
        type: String,
        required: true
      },
      
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      default:"123456"
    },
    location: {
      type: String,
      required: true
    },
    contact: {
        type: String,
        required: true,
        unique:true
      },
      file: {
        type: String, //URL
        required: true,
      },
  });

const restaurantowner = mongoose.model('restaurantowner', restaurantownerschema);

module.exports = restaurantowner;