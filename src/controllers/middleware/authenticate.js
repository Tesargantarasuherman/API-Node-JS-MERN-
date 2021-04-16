const jwt = require('jsonwebtoken')

const authenticate = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token,'secretValue')
        req.user= decode
        console.log(req.user.role)
        next()
    }
    catch(error){
        res.json({
            message:'Gagal Autentifikasi',
        })
    }
}
// fungsi role user
const authRole=(role)=>{
    return (req,res,next)=>{
        if(req.user.role !== role){
            res.status(401).json({
                message:'Tidak Diizinkan',
            })
        }
        next()
    }
}
module.exports = {
    authenticate,
    authRole
}