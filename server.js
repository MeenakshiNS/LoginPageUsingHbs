const express =require('express')
const session = require("express-session");
var cookieParser = require('cookie-parser');
const { v4: uuid4 } = require("uuid");
const hbs = require('hbs')
const path = require('path')
const app = express()

//view engine setup
app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// app.use("/static", express.static(path.join(__dirname, "style")));
app.use(cookieParser()); //add middleware to the application's request processing pipeline.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//this is a middleware. It takes a function as an argument, which will be invoked for each incoming request.
app.use((req,res,next)=>{
    if(!req.user)//The req.user property typically holds information about the currently authenticated user. If it is not set, it indicates that the user is not authenticated.
        res.header("Cache-Control", "private, no-cache, no-store, must-revalidate")
    next()//If the req.user property is not set, it sets a specific header on the response using res.header() method. In this case, it sets the Cache-Control header with the value "private, no-cache, no-store, must-revalidate"
})

// It configures and adds the session middleware to the application using app.use().
// it is used to add the express-session middleware.
app.use(session({//The session() function is invoked to create an instance of the session middleware.
    secret: uuid4(),//secret: uuid4() sets the secret option to a randomly generated UUID (version 4) using the uuid4() function. 
    resave: false,//Setting it to false prevents unnecessary session saves, improving performance.
    saveUninitialized:true// When set to true, a session will be created even if it is not modified during the request. Setting it to true is useful for implementing login sessions and other scenarios where you want to establish a session even for unauthenticated users.
}))

//This line imports the module located at './routes/login' and assigns it to the loginRouter variable. It suggests that there is a separate file or module responsible for handling login-related routes.
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const signoutRouter = require('./routes/signout')//
const homeRouter = require('./routes/home')
const dashboardRouter = require('./routes/dashboard')
const adminadduserrouer = require('./routes/admin-adduser')
const adminDeleteRouter = require('./routes/admin-deleteuser')
const adminSearchRouter = require('./routes/admin-search')
const admineditRouter = require('./routes/admin_edit')
//each line mounts a specific route module onto the Express application:
app.use(loginRouter)
app.use(signupRouter)
app.use(signoutRouter)
app.use(homeRouter)
app.use(dashboardRouter)
app.use(adminadduserrouer)
app.use(adminDeleteRouter)
app.use(adminSearchRouter)
app.use(admineditRouter)
//mounting the defined routes and their corresponding route handlers onto the Express application

//to start the server and listen for incoming HTTP requests on port 3000. 
app.listen(2000,()=>{
    console.log('server is created');
})