const express = require('express');

const router = express.Router();

const subKelasController = require('../controllers/subkelasController')

router.post('/tambah-subkelas/:id',subKelasController.tambahSubKelas)
router.post('/update-subkelas/',subKelasController.updateSubKelas)
router.get('/detail-subkelas/:id',subKelasController.detailSubKelas)

module.exports = router;