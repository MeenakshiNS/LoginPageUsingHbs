const express =require('express')
const router = express.Router()
const collection = require('../model/mongodb')
const bcrypt = require('bcrypt');


router.post("/admin", async (req,res) => {
    let searchitem = req.body.search;
    const data = await collection.find({username: {$regex: '^' + searchitem}})
    console.log(data); 
    if(data == ""){
      res.render("dashboard",{message : "User with this username doesnot exist",data : data,name:req.session.name})
    }
    else{
      res.render("dashboard",{title : "Admin System", data :data, name:req.session.admin})//
    }
  })

  module.exports = router