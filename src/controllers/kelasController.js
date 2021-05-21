const KelasModel = require('../models/kelas');
const TransaksiModel = require('../models/transaksi');
const kursus = require('../models/kursus');
const instruktur = require('../models/instruktur');
const kelas = require('../models/kelas');
const KelasSelesai = require('../models/kelasSelesai');

exports.tambahKelas = (req, res, next) => {

    let Kelas = new KelasModel({ id_kursus: req.body.id_kursus, judul: req.body.judul, posisi: req.body.posisi })
    Kelas.save().then(result => {
        res.status(201).json({ message: 'Create Kelas Success', data: result });
        next()
    }).catch(err => {
        next(err);
    })
}
exports.ambilKelasSaya = (req, res, next) => {
    let idUser = req.params.idUser;
    let data_kursus = new Object();
    let data = [];
    TransaksiModel.find({ id_user: idUser }).then(result => {
        result.forEach(res => {
            data_kursus.id = res.id
            data_kursus.nama_kursus = res.data_kursus.nama
            data_kursus.harga = res.harga_total
            data_kursus.status_transaksi = res.status_transaksi
            data_kursus.id_kursus = res.id_kursus
            data_kursus.id_user = res.id_user
            data_kursus.tipe_kursus = res.data_kursus.tipe_kursus
            data_kursus.nama_instruktur = res.data_kursus.instruktur.nama
            data_kursus.foto_instruktur = res.data_kursus.instruktur.foto_profile

            data.push(data_kursus)
        });
        res.status(200).json({
            message: 'Data Kelas Saya Berhasil Di Panggil', data: {
                data
            }
        });
    })
}
exports.ambilDetailKelasSaya = (req, res, next) => {
    let idUser = req.params.idUser;
    let idKursus = req.params.idKursus;
    TransaksiModel.find({ id_user: idUser, id_kursus: idKursus }).then(transaksi => {
        if (transaksi !== []) {
            const id = transaksi[0].id_kursus;
            kursus.findById(id).then(result => {
                if (!result) {
                    res.status(200).json({ message: 'Data Kursus Tidak Ada', data: {} });
                } else {
                    if (transaksi[0].status_transaksi == 0) {
                        res.status(200).json({
                            message: 'Kursus Belum di bayar', data: {
                                transaksi
                            }
                        });
                    } else {
                        let data_kursus = result;
                        let data_subkelas = new Object();
                        data_subkelas.kelas = [];
                        KelasModel.find({ id_kursus: result._id }).then(kelas => {

                            kelas[0].subkelas.forEach(klas => {
                                console.log(klas.id)
                                KelasSelesai.find({id_subkelas:klas.id}).then(selesai=>{
                                    if(selesai){
                                        data_subkelas.kelas.kelas_selesai = 1
                                    }
                                    else{
                                        data_subkelas.kelas.kelas_selesai = 0
                                    }
                                })
                                data_subkelas.kelas.push(klas)
                            })

                            res.status(200).json({
                                message: 'Data Kursus Berhasil Di Panggil',
                                data: {
                                    data_kursus,
                                    kelas,
                                    data_subkelas
                                }
                            });
                        })

                    }

                }

            }).catch(err => {
                next(err);
            })

        } else {
            res.status(200).json({ message: 'Data Kursus Berhasil Di Panggil', data: {} });
        }

    })
}
exports.kelasSelesai = (req, res, next) => {

    let Kelas = new KelasSelesai({ id_subkelas: req.body.id_subkelas, id_user: req.body.id_user, selesai_kelas: req.body.selesai_kelas })
    Kelas.save().then(result => {
        res.status(201).json({ message: 'Tandai Kelas Success', data: result });
        next()
    }).catch(err => {
        next(err);
    })
}
