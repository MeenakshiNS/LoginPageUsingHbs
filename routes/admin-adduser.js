const express =require('express')
const collection = require('../model/mongodb')
const router = express.Router()
const bcrypt = require('bcrypt');

router.get('/admin-adduser',(req,res)=>{
    res.render('adduser')
}) 

router.post('/admin-adduser',async(req,res)=>{
    const checkuser = await collection.findOne({$or:[{username:req.body.name},{email:req.body.email}]})
    // console.log(checkuser);
    const securePassword = async (password) => {
        try {
            const passwordHash = await bcrypt.hash(password,10);
            return passwordHash;
        }
        catch (error) {
            console.log(error.message)
        }
    }
    const securepassword = await securePassword(req.body.password);

    if(!checkuser){
        const userDetials = {
            username :req.body.username,
            email : req.body.email,
            role: req.body.role,
            password:securepassword
        }
        await collection.insertMany([userDetials])
        res.redirect('/admin')
    }else{
        res.render('adduser', {message:'user already exists.'})
    }
})

module.exports =router