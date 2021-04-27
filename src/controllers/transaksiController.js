const kursus = require('../models/kursus');
const instruktur = require('../models/instruktur');
const KelasModel = require('../models/kelas');
const SubKelasModel = require('../models/subkelas');

exports.tambahTransaksi = (req, res, next) => {

    let Kursus = new kursus({
        id_instruktur: req.body.id_instruktur,
        judul_kursus: req.body.judul_kursus,
        foto_kursus: req.body.foto_kursus,
        harga_kursus: req.body.harga_kursus,
        tipe_kursus: req.body.tipe_kursus
    })
    Kursus.save().then(result => {
        res.status(201).json({message: 'Create Kursus Success', data: result});
        next()
    }).catch(err => {
        next(err);
    })
}

