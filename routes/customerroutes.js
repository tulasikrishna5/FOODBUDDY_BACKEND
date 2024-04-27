const customercontroller = require("../controllers/customercontroller")
const stripe = require("stripe")("sk_test_51P9uJISDSdxPQtHGrvmezhIzJSHuyxG0TKYFPiCzy03KxsXx6Swxn9sDOIletSWNX3C1F6rF0yM55O0zX9Efmo8x007l4cizdc")
const express = require("express")
const customerrouter = express.Router()

customerrouter.post("/insertcustomer",customercontroller.insertcustomer)
customerrouter.post("/checkcustomerlogin",customercontroller.checkcustomerlogin)
customerrouter.get("/viewmenubycustomer/:runame",customercontroller.viewmenubycustomer)
customerrouter.put("/forgotpassword",customercontroller.forgotpassword)
customerrouter.put("/updateprofile",customercontroller.updateprofile)
customerrouter.get("/profile/:email",customercontroller.profile)
customerrouter.post("/addtocart",customercontroller.addtocart)
customerrouter.get("/viewcart/:email",customercontroller.viewcart)
customerrouter.get("/updatequantity/:email/:quantity/:itemid",customercontroller.updatequantity)

customerrouter.post("/create-checkout-session",customercontroller.checkout)
module.exports = customerrouter
