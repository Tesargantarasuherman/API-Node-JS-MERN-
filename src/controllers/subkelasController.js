const KelasModel = require('../models/kelas');

exports.tambahSubKelas = (req, res, next) => {
    let id = req.params.id
    KelasModel.findByIdAndUpdate({
        _id: id
    }, {
        $push: {
            subkelas: 
                {
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
