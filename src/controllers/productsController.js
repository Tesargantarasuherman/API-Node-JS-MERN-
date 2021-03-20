exports.createProduct =(req,res,next)=>{
    // console.log('req',req.body)
    const name  = req.body.name;
    const price = req.body.price;
    
    res.json({
        message:'Create Product Success',
        data:{
            id:1,
            name:name,
            price:price
        }
    });
    next()
}
exports.getAllProduct=(req,res,next)=>{
    res.json({
        message:'Get All Product Success',
        data:{
            id:1,
            name:'Tesar',
            email:'t@gmail.com'
        }
    });
    next()
}
