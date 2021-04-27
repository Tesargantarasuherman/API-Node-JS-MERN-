const SubKelasModel = require('../models/subkelas');
const KelasModel = require('../models/kelas');
var crypto = require("crypto");

exports.tambahSubKelas = (req, res, next) => {
    let idKelas = req.params.id
    let id = crypto.randomBytes(16).toString('hex')
    KelasModel.findByIdAndUpdate({
        _id: idKelas
    }, {
        $push: {
            subkelas: {
                id: id,
                judul: req.body.judul,
                deskripsi: req.body.deskripsi,
                link_video: req.body.link_video,
                posisi: req.body.posisi,
                id_kelas_sebelumnya: req.body.id_kelas_sebelumnya,
                id_kelas_selanjutnya: req.body.id_kelas_selanjutnya
            }
        }
    }).then(result => {
        console.log('Done')
        res.json(result)
    }).catch(err => {
        next(err);
    })
}
exports.updateSubKelas = (req, res, next) => {
    let idSubKelas = req.body.id
    KelasModel.findOneAndUpdate({
        "subkelas.id": idSubKelas
    }, {
        $set: {
            "subkelas.$.judul": req.body.judul,
            "subkelas.$.deskripsi": req.body.deskripsi,
            "subkelas.$.link_video": req.body.link_video,
            "subkelas.$.posisi": req.body.posisi,
            "subkelas.$.id_kelas_sebelumnya": req.body.id_kelas_sebelumnya,
            "subkelas.$.id_kelas_selanjutnya": req.body.id_kelas_selanjutnya
        }
    }).then(result => {
        res.json('Data Berhasil Diubah')
    }).catch(err => {
        next(err);
    })
}
exports.detailSubKelas = (req, res, next) => {
    let idSubKelas = req.params.id
    KelasModel.find({},{
        subkelas:{
            $elemMatch:{
                id:idSubKelas
            }
        },
    }).then(result => {
        res.json(result)
    }).catch(err => {
        next(err);
    })
}
