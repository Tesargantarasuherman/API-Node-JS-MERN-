const User = require ('../models/user');
var md5 = require('md5');/*npm i md5 */


exports.register = (req,res,next) =>{
    const name = req.body.name;
    const email =req.body.email;
    const password = md5(req.body.password);
    
    const UserPost = new User({
        name :name,
        email:email,
        password:password,
    })
    UserPost.save().then(result =>{
        res.status(201).json({
            message : 'Create User Success',
            data:result
        });
        next()
    })
}