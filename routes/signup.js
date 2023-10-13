const express =require('express')
const router = express.Router()
const collection = require('../model/mongodb')
const bcrypt = require('bcrypt');

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.post('/signup',async(req,res)=>{
    const checkuser = await collection.findOne({$or:[{username:req.body.name},{email:req.body.email}]})

    //console.log(checkuser);
   
  // secure password

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
        const data ={
            username:req.body.username,   
            email:req.body.email,
            role:req.body.role,
            password:securepassword
    
        }
        console.log(data);
        await collection.insertMany([data])

        if(req.body.role === 'user'){
            req.session.user=req.body.username
            res.render('home',{username:req.body.username})
        } else if(req.body.role === 'admin'){
            req.session.admin=req.body.username
            //const userDT = await collection.find({username:{$ne:req.session.admin}})
            //res.render('dashboard')

            res.render('login',{msg:'Login successful!'})
        }
    
    } else{
        res.render('signup',{message:'Username or Email already exists.'})
    }
   
})

module.exports = router;