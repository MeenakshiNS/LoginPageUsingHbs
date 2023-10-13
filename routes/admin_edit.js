const express =require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const collection = require('../model/mongodb')
const { default: mongoose } = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');


router.get('/admin/editUser',async (req,res)=>{
    if(req.session.admin){
        let id = req.query.id
        const list = await collection.findOne({_id: new ObjectId(id)})
        res.render('adminedit',{data:list})
        console.log(list);
    }
}) 

router.post('/adminedit',async (req,res)=>{
    const username = req.body.username;
  const email = req.body.email;
  const role = req.body.role;
  const password = req.body.password;
//   if (!username) {
//     return res.status(400).send('Please enter the username.');
//   }
if (!username) {
 
    const warningMessage = 'Please enter the username.';
    return res.render('adminedit',{message:warningMessage})
  }
    await collection.updateOne({_id: new ObjectId(req.body.id)},{$set:{username:req.body.username, email:req.body.email, role:req.body.role, password:req.body.password}})
    res.redirect('/admin')
})

module.exports = router