const express = require('express');

const router = express.Router();
const {body} =require('express-validator');

const authController = require('../controllers/authController')

router.post('/register',[
    body('email').normalizeEmail().isEmail().withMessage('format email tidak benar'),
    body('password').isLength({min:6}).withMessage('password mimimum 6 karakter')
],authController.register)
router.post('/login',authController.login)
router.get('/logout',authController.logout)

module.exports = router;