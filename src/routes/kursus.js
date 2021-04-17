const express = require('express');

const router = express.Router();

const kursusController = require('../controllers/kursusController')

router.post('/tambah-kursus',kursusController.tambahKursus)
router.get('/detail-kursus/:kursusId',kursusController.detailKursus)

module.exports = router;