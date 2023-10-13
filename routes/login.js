const express =require('express')
const router = express.Router()
const collection = require('../model/mongodb')

router.get('/login',(req,res)=>{
    //console.log(req.sessionID);
    if(req.session.user){
        res.redirect('/home')
    } else if(req.session.admin){
        res.redirect('/admin')
    } else{
        res.render('login')
    }
    
})

router.post('/login',async(req,res)=>{  
   try {
    const userDT = await collection.findOne({username:req.body.username})
    console.log(userDT);
    if(userDT.password == req.body.password && userDT.role === 'admin'){
        req.session.admin = req.body.username;
        res.redirect('/admin');
    } else if(userDT.password == req.body.password && userDT.role === 'user'){
        console.log('hello user');
        req.session.user = req.body.username
        res.render('home',{username:req.body.username})

       
    } else{
        res.render('login',{message:'invalid login credentials'});
    }
   } catch(err){
    console.log(err);
    res.render('login', {message:'Invalid username'});
   }
})

module.exports = router;