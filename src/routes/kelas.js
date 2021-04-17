const express = require('express');

const router = express.Router();

const kelasController = require('../controllers/kelasController')

router.post('/tambah-kelas',kelasController.tambahKelas)

module.exports = router;