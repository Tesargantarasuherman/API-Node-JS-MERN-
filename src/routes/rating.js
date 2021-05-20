const express = require('express');

const router = express.Router();

const ratingController = require('../controllers/ratingController')

router.post('/tambah-rating',ratingController.tambahRating)

module.exports = router;