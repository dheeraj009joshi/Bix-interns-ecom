cont order = require('../model/order);

export.placeorder = async(req, res) =>{
  const{userID, ProductsIDs, totalallotment} = req.body;
  try{
    const newO
