const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/logintutorial').then(()=>{
    console.log('mongodb connected');
}).catch(()=>{
    console.log('connection faild');
})

//Mongoose is an Object Data Modeling (ODM) library for MongoDB and provides a convenient way to define schemas and models to work with MongoDB databases.
const loginschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },


})

//creates a Mongoose model named 'user' based on the loginschema 
const collection = new mongoose.model('user',loginschema)

module.exports = collection;