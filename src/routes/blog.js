const express = require('express');
const {body} =require('express-validator');
const router = express.Router();

const blogController =require('../controllers/blogController');

router.post('/post',
[
    body('title').isLength({min:5}).withMessage('input title minimum 5 karakter'),
    body('content').isLength({min:5}).withMessage('input content mimimum 5 karakter')
],blogController.createBLogPost);

router.get('/posts',blogController.getAllPosts)

module.exports = router;