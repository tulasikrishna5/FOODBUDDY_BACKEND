const admincontroller = require("../controllers/admincontroller")


const express = require("express")
const adminrouter = express.Router()

// // admin routes
 adminrouter.get("/viewcustomers",admincontroller.viewcustomer)
 adminrouter.get("/viewrestaurantowner",admincontroller.viewrestaurantowner)
 adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)
 adminrouter.post("/addrestaurantowner",admincontroller.addrestaurantowner)
 adminrouter.delete("/deletecustomer/:email",admincontroller.deletecustomer)
 adminrouter.delete("/deleterestaurantowner/:email",admincontroller.deleterestaurantowner)

module.exports = adminrouter
