exports.createProduct =(req,res,next)=>{
    res.json({
        message:'Create Product Success',
        data:{
            id:1,
            name:'Tesar',
            email:'t@gmail.com'
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
