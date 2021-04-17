const express = require('express');

const router = express.Router();
const {body} =require('express-validator');

const instrukturController = require('../controllers/instrukturController')

router.post('/tambah-instruktur',instrukturController.tambahInstruktur)

module.exports = router;