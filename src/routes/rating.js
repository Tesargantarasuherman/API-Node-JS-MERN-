const express = require('express');

const router = express.Router();

const ratingController = require('../controllers/ratingController')

router.post('/tambah-rating',ratingController.tambahRating)
router.get('/rating/:idKursus',ratingController.detailRating)

module.exports = router;