const express = require('express');

const router = express.Router();

const kelasController = require('../controllers/kelasController')

router.post('/tambah-kelas',kelasController.tambahKelas)
router.get('/kelas-saya/:idUser',kelasController.ambilKelasSaya)
router.get('/kelas-saya/:idUser/:idKursus',kelasController.ambilDetailKelasSaya)

module.exports = router;