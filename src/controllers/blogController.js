const {validationResult} = require('express-validator');
const BlogPost = require ('../models/blog');
const User = require ('../models/user');
const path = require('path');
const fs = require('fs');
// const { count } = require('../models/blog');
// const { response } = require('express');
// Tambah Data Post
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
    const id_penulis = req.body.id_penulis;
    
        let idS = id_penulis;

        User.findOne({_id:idS}).then(post => {
            
                id = post._id;
                nama = post.name;
                const Posting = new BlogPost({
                    title:title,
                    image:image,
                    content : content,
                    author:{
                        id:id,
                        name:nama
                    }
                })
                Posting.save().then(result =>{
                    res.status(201).json({
                        message : 'Create Blog Success',
                        data:result
                    });
                    next()
                })
        })
        .catch(err =>{
            next(err);
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
// Ambil Seluruh Data Post
exports.getAllPosts = (req,res,next)=>{
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5 ;/* || is default value */
    let totalItems;
    
//Get All Post
    // BlogPost.find()
    // .then(result => {
    //     res.status(200).json({
    //         message:'Data Blog Post Berhasil Di Panggil',
    //         data:result
    //     });
    // })
    // .catch(err =>{
    //     next(err);
    // })
//End Get All Post

//Pagination
 
    BlogPost.find()
    .countDocuments()
    .then( count => {

       totalItems = count;

       return BlogPost.find()
       .skip((parseInt(currentPage - 1) * perPage))
       .limit(parseInt(perPage)); 
    })
    .then(result => {
        res.status(200).json({
            message:'Data Blog Post Berhasil Di Panggil',
            data : result,
            totalData : totalItems,
            per_page : perPage,
            total_page:Math.ceil(totalItems/perPage),
            current_page : currentPage,
        });
    })
    .catch(err=>{
        next(err)
    })
//End Pagination
}
// Lihat Detail Post
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
//Update Post
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
            //hapus image sebelumnya
            deleteImage(post.image);
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
// Hapus Data Post
exports.deletePostById =(req,res,next)=>{
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post=>{
        if(!post){
            const err = new Error('ID Tidak Ditemukan');
            err.errorStatus = 404;
            throw err;
        }
        else{

            deleteImage(post.image);

            return BlogPost.findByIdAndRemove(postId);
        }
    }).then(result=>{
        res.status(200).json({
            message:'Hapus Data Berhasil',
            data:result
        });
    })
    .catch(err =>{
        next(err);
    })}
//Hapus Gambar Post
const deleteImage = (filePath)=>{
    filePath = path.join(__dirname,'../..',filePath);
    fs.unlink(filePath,err=>console.log(err));
}