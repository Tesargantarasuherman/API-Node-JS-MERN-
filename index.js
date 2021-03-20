const express =require('express');

const app = express();

const router =express.Router();

router.use('/price',(req,res,next)=>{
    console.log('request:',req.originalUrl);
    console.log('method:',req.method);
    res.json({
        price:'100000000',
    });
    next()
})
router.get('/costumers',(req,res,next)=>{
    res.json({
        costumer:'100000000',
    });
    next();
})
app.use('/',router);

app.listen(3001);