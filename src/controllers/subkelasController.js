const subKelasModel = require ('../models/subkelas');

exports.tambahSubKelas = (req,res,next) =>{

        let SubKelas = new subKelasModel({
            id_kelas :req.body.id_kelas,
            judul:req.body.judul,
            deskripsi:req.body.deskripsi,
            link_video:req.body.link_video,
            posisi:req.body.posisi,
            id_kelas_sebelumnya:req.body.id_kelas_sebelumnya,
            id_kelas_selanjutnya:req.body.id_kelas_selanjutnya,
        })
        SubKelas.save().then(result =>{
            res.status(201).json({
                message : 'Create Sub Kelas Success',
                data:result
            });
            next()
        })
        .catch(err =>{
            next(err);
        })
}