const express =require('express');
var bodyParser = require('body-parser')

const app = express();

const productRoutes = require('./src/routes/products');
const authRoutes = require('./src/routes/auth');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type','Authorization');
    next()
})
// endpoint first
app.use('/v1/costumer',productRoutes);
app.use('/v1/auth',authRoutes);
app.use('/v1/auth',authRoutes);



app.listen(3000);