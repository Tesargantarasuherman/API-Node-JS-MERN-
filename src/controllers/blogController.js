const {validationResult} = require('express-validator');
const BlogPost = require ('../models/blog');

exports.createBLogPost = (req,res,next) =>{
    const errors = validationResult(req)
    // middleware check
    if(!errors.isEmpty()){
        const err = new Error('Invalid Input')
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;

    }
    if(!req.file){
        const err = new Error('Image Harus di Upload')
        err.errorStatus = 422;
        throw err;
    }

    // end middleware
    const title = req.body.title;
    const image = req.file.path;
    const content = req.body.content;

    const Posting = new BlogPost({
        post_id :1,
        title:title,
        image:image,
        content : content,
        author:{
            uid:1,
            name:'iamsuherman'
        }
    })
    Posting.save().then(result =>{
        res.status(201).json({
            message : 'Create Blog Success',
            data:result
        });
        next()
    })
    // res.status(201).json({
    //     message : 'Create Blog Success',
    //     data:{
    //         post_id :1,
    //         title:title,
    //         image:'image',
    //         content : content,
    //         created_at:"23/03/2021",
    //         author:{
    //             user_id:1,
    //             name:'lorem'
    //         }
    //     }
    // });
    // next()

}