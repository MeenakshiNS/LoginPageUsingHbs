const express =require('express')
const router = express.Router()
const bcrypt = require('bcrypt');


router.get('/signout',(req,res)=>{
    req.session.destroy((err)=>{
       if(err){
        res.send('Error')
       }else{
        res.redirect('/login')
       }
    })
    //res.render('login' ,{title:''})
})

module.exports = router;