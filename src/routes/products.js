const express =require('express');
const router = express.Router();

router.use('/products',(req,res,next)=>{
    console.log('request:',req.originalUrl);
    console.log('method:',req.method);
    res.json({
        name:'Tesar',
        email:'t@gmail.com'
    });
    next()
})

module.exports = router;