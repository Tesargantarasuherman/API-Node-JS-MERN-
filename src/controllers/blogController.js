const {validationResult} = require('express-validator');
const BlogPost = require ('../models/blog');

exports.createBLogPost = (req,res,next) =>{
    const title = req.body.title;
    // const image = req.body.image;
    const content = req.body.content;

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const err = new Error('Invalid Input')
        err.errorStatus = 400;
        err.data = errors.array();
        throw err;

    }

    const result = {
        message : 'Create Blog Success',
        data:{
            post_id :1,
            title:title,
            // image:image,
            content : content,
            created_at:"23/03/2021",
            author:{
                user_id:1,
                name:'lorem'
            }
        }
    };
    res.status(201).json(result)
    next()
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