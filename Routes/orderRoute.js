const express = require('express');
const router = express.Router();

import {getOrderById,createOder} from "../Controllers/OrderControl" ;


app.route("/")
      .get(protect,getAllOrders)
      .post(protect, createOder)


app.route("/:id")
      .get(protect,getOrderById)
      .patch(protect, deleteOrder)
      .put(protect,updateOrder)
      




module.exports = router; 
