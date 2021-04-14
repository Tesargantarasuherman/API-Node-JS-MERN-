const express = require('express');
const {body} =require('express-validator');
const router = express.Router();
const blogController  = require('../controllers/blogController');
const {authenticate,authRole}    =  require('../controllers/middleware/authenticate')


router.post('/post',
[
    body('title').isLength({min:5}).withMessage('input title minimum 5 karakter'),
    body('content').isLength({min:5}).withMessage('input content mimimum 5 karakter')
],blogController.createBLogPost);

// router.get('/posts?page=1&perPage=5',blogController.getAllPosts);

router.get('/posts',authenticate,authRole('admin'),blogController.getAllPosts);
router.get('/post/:postId',blogController.getPostById);
router.put('/post/:postId',[
    body('title').isLength({min:5}).withMessage('input title minimum 5 karakter'),
    body('content').isLength({min:5}).withMessage('input content mimimum 5 karakter')
],blogController.updatePostById);
router.delete('/post/:postId',blogController.deletePostById)

module.exports = router;