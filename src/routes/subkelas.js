const express = require('express');

const router = express.Router();

const subKelasController = require('../controllers/subkelasController')

router.post('/tambah-subkelas',subKelasController.tambahSubKelas)

module.exports = router;