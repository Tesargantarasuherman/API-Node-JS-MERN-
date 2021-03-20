const express =require('express');
const router = express.Router();

const productController = require("../controllers/productsController")

router.post('/products',productController.createProduct)
router.get('/products',productController.getAllProduct)

module.exports = router;