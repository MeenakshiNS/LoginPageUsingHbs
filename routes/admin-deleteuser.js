const express =require('express')
const router = express.Router()
const collection = require('../model/mongodb')
const bcrypt = require('bcrypt');


router.get('/admin/deleteUser',async(req,res)=>{
    const id=req.query.id
    await collection.deleteOne({_id:id})
    // res.redirect('/admin');
})



module.exports = router