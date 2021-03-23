const express = require('express');
const {body} =require('express-validator');
const router = express.Router();

const blogController =require('../controllers/blogController');

router.post('/post',
[body('title').isLength({min:5}),body('content').isLength({min:5})],blogController.createBLogPost);

module.exports = router;