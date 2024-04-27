const restaurantownercontroller = require("../controllers/restaurantownercontroller")

const express = require("express")
const restaurantownerrouter = express.Router()

restaurantownerrouter.post("/insertrestaurantOwner",restaurantownercontroller.insertrestaurantOwner)
restaurantownerrouter.post("/checkrestaurantOwnerlogin",restaurantownercontroller.checkrestaurantOwnerlogin)
restaurantownerrouter.post("/additem",restaurantownercontroller.additem)
restaurantownerrouter.put("/forgotpassword",restaurantownercontroller.forgotpassword)
restaurantownerrouter.get("/profile/:email",restaurantownercontroller.profile)
restaurantownerrouter.get("/viewrestaurants",restaurantownercontroller.viewrestaurants)
restaurantownerrouter.get("/restaurantimage/:filename",restaurantownercontroller.restaurantimage)
restaurantownerrouter.get("/viewmenu/:runame",restaurantownercontroller.viewmenu)

module.exports = restaurantownerrouter
