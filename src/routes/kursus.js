const express = require('express');

const router = express.Router();

const kursusController = require('../controllers/kursusController')

router.post('/tambah-kursus',kursusController.tambahKursus)
router.get('/detail-kursus/:kursusId',kursusController.detailKursus)
router.get('/semua-kursus',kursusController.semuaKursus)

module.exports = router;