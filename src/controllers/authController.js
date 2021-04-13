const User = require ('../models/user');
const md5 = require('md5');/*npm i md5 */
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const ip = require("ip");

exports.register = (req,res,next) =>{

    bcrypt.hash(req.body.password,10,function(err, hashedPass){
        if(err){
            res.json({
                error : err
            });
        }
        let UserPost = new User({
            name :req.body.name,
            email:req.body.email,
            role:req.body.role,
            password:hashedPass,
        })
        UserPost.save().then(result =>{
            res.status(201).json({
                message : 'Create User Success',
                data:result
            });
            next()
        })
        .catch(err =>{
            next(err);
        })
    })
}
exports.login = (req,res,next) =>{
    const email = req.body.email;
    const password = req.body.password;

    // User.findOne({$and:[{email: email},{password: password}]
    User.findOne({email: email})
    .then(user=>{
          if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error : err
                    });
                }
                if(result){
                   let token = jwt.sign({role:user.role},'secretValue',{expiresIn:'1h'}) 
                   res.json({
                       message:'Login Successfull',
                       data:user,
                       token
                   })
                }else{
                    res.json({
                        message:'Password Does no Matched!',
                    })
                }
            })
          }else{
            res.status(404).json({
                message : 'User Not Found',
            });
          }
      })
}