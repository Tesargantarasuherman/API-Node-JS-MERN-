const express =require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type','Authorization');
    next()
})
// endpoint first
app.use('/v1/auth',authRoutes);
app.use('/v1/blog',blogRoutes);
// function errors
app.use((error,req,res,next)=>{
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message:message,data:data});
})
mongoose.connect('mongodb+srv://iamsuherman:pI7LQB0o9IxBBnxB@cluster0.w3nsw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(()=>{
    app.listen(3000,()=>console.log('Connection Success'));
})
.catch(err=> console.log(err));


