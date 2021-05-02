const kursus = require('../models/kursus');
const modelTransaksi = require('../models/transaksi');

exports.tambahTransaksi = (req, res, next) => {
    let idKursus = req.params.idKursus;
    let harga_kursus = null
    let data_kursus = new Object()

    modelTransaksi.findOne({id_user: req.body.id_user, id_kursus: idKursus}).then(result => {
        if (!result) {
            kursus.find({_id: idKursus}).then(result => {
                
                data_kursus.nama = result[0].judul_kursus
                data_kursus.tipe_kursus = result[0].tipe_kursus
                data_kursus.instruktur = result[0].data_instruktur

                harga_kursus = result[0].harga_kursus
                
                let Transaksi = new modelTransaksi({data_kursus:data_kursus,id_kursus: idKursus, id_user: req.body.id_user, harga_total: harga_kursus, status_transaksi: req.body.status_transaksi})
                Transaksi.save().then(result => {
                    res.status(201).json({message: 'Pembelian Sukses', data: result});
                    next()
                }).catch(err => {
                    next(err);
                })
            })
        } else {
            res.status(401).json({message: 'Kursus Sudah Di Beli,Silahkan Lanjutkan Pembayaran', data: result});
        }
    })


}
