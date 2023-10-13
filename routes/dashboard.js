const express =require('express')
const collection = require('../model/mongodb')
const router = express.Router()
const bcrypt = require('bcrypt');


router.get('/admin',async(req,res)=>{
    //res.render('dashboard')
  try{
    
      if(req.session.admin){
        const userDT = await collection.find({username:{$ne:req.session.admin}})
        //const data = await collection.findOne({name:{$ne:req.body.admin}})
        res.render('dashboard',{title:"Admin Side ",data:userDT,name:req.session.admin})
    }else{
        res.redirect('/login')
    }
  }catch{
    res.send('Error');
  }
   
})

module.exports = router;