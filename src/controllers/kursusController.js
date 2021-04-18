const kursus = require('../models/kursus');
const instruktur = require('../models/instruktur');
const KelasModel = require('../models/kelas');
const SubKelasModel = require('../models/subkelas');

exports.tambahKursus = (req, res, next) => {

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
exports.detailKursus = (req, res, next) => {
    const id = req.params.kursusId;


    kursus.findById(id).then(result => {
        if (!result) {
            const err = new Error('ID Tidak Di Temukan');
            error.errorStatus = 404;
            throw error;
        } else {
            var data_kursus = result;
            instruktur.findById(result.id_instruktur).then(instruktur => {
                KelasModel.find({id_kursus: result._id}).then(kelas => {
                    kelas.forEach(kelas => {
                        SubKelasModel.find({id_kelas: kelas._id}).then(subkelas => {
                            var data = {kelas,subkelas}
                            console.log(data)
                            res.status(200).json({
                                message: 'Data Kursus Berhasil Di Panggil',
                                data: {
                                    data_kursus,
                                    instruktur,
                                    data
                                }
                            });
                        })
                    });

                })
            })

        }

    }).catch(err => {
        next(err);
    })
}
