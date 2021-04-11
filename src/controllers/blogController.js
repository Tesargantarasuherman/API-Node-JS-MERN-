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

    // end middleware check
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
exports.getAllPosts = (req,res,next)=>{
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            message:'Data Blog Post Berhasil Di Panggil',
            data:result
        });
    })
    .catch(err =>{
        next(err);
    })
}
exports.getPostById =(req,res,next) => {
    const id = req.params.postId ;
    BlogPost.findById(id)
    .then(result => {
        if(!result){
            const err = new Error('ID Tidak Di Temukan') ;
            error.errorStatus = 404;
            throw error ;    
        }
        else{
            res.status(200).json({
                message:'Data Blog Post By ID Berhasil Di Panggil',
                data:result
            });
        }

    })
    .catch(err =>{
        next(err);
    })
}
exports.updatePostById =(req,res,next)=>{
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

    // end middleware check

    const title = req.body.title;
    const image = req.file.path;
    const content = req.body.content;
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('ID Tidak Ditemukan');
            err.errorStatus = 404;
            throw err;
        }else{
            post.title = title;
            post.content = content;
            post.image = image;
            
            return post.save();
        }
    })
    .then(result =>{
        res.status(200).json({
            message:'Update Data Berhasil',
            data:result
        })
    })
    .catch(err =>{
        next(err);
    })
}