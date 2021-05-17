const KelasModel = require('../models/kelas');
const TransaksiModel = require('../models/transaksi');
const kursus = require('../models/kursus');
const instruktur = require('../models/instruktur');
const kelas = require('../models/kelas');

exports.tambahKelas = (req, res, next) => {

    let Kelas = new KelasModel({id_kursus: req.body.id_kursus, judul: req.body.judul, posisi: req.body.posisi})
    Kelas.save().then(result => {
        res.status(201).json({message: 'Create Kelas Success', data: result});
        next()
    }).catch(err => {
        next(err);
    })
}
exports.ambilKelasSaya = (req, res, next) => {
    let idUser = req.params.idUser;
    TransaksiModel.find({id_user: idUser}).then(result => {
        res.status(200).json({message: 'Data Kelas Saya Berhasil Di Panggil', data: {
                result
            }});
    })
}
exports.ambilDetailKelasSaya = (req, res, next) => {
    let idUser = req.params.idUser;
    let idKursus = req.params.idKursus;
    TransaksiModel.find({id_user: idUser, id_kursus: idKursus}).then(transaksi => {
        if (transaksi !== []) {
            const id = transaksi[0].id_kursus;
            kursus.findById(id).then(result => {
                if (!result) {
                    res.status(200).json({message: 'Data Kursus Tidak Ada', data: {}});
                } else {
                    if (transaksi[0].status_transaksi == 0) {
                        res.status(200).json({message: 'Kursus Belum di bayar', data: {
                                transaksi
                            }});
                    } else {
                        let data_kursus = result;
                        KelasModel.find({id_kursus: result._id}).then(kelas => {
                            res.status(200).json({
                                message: 'Data Kursus Berhasil Di Panggil',
                                data: {
                                    data_kursus,
                                    kelas
                                }
                            });
                        })

                    }

                }

            }).catch(err => {
                next(err);
            })

        } else {
            res.status(200).json({message: 'Data Kursus Berhasil Di Panggil', data: {}});
        }

    })
}
