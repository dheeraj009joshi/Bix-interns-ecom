const express = require('express');
const router = express.Router();
const protect = require('../Middlewares/auth');
const {getOrderById,createOder, getAllOrders, deleteOrder ,updateOrder} = require("../Controllers/orderControllers") ;


router.route("/")
      .get(getAllOrders)
      .post(createOder)



      
router.route("/:id")
      .get(getOrderById)
      .patch( deleteOrder)
      .put(updateOrder)
      




module.exports = router; 
