const { json } = require('body-parser');
const Order = require('../Models/Order');
const User= require('../Models/User');


exports.createOder = async (req, res, next)=>{

    try{

        const oder=  await Order.create(req.body);
        res.status(201).json( {success: true, data: oder})
    }catch (error){
        console.log.apply(error)
        next(error) // sending error the handler
    }
   
};

exports.getOrderById = async (req, res, next)=>{
    try{
        const oder=  await Order.findById(req.params.id);
        res.status(200).json( {success: true, data: oder, message:"Oder found"})
    }catch (error){
        console.log.apply(error)
        next(error) // sending error the handler
    }
   
};

