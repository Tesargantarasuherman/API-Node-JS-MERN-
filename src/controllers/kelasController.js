const KelasModel = require ('../models/kelas');

exports.tambahKelas = (req,res,next) =>{

        let Kelas = new KelasModel({
            id_kursus :req.body.id_kursus,
            judul:req.body.judul,
            posisi:req.body.posisi,
        })
        Kelas.save().then(result =>{
            res.status(201).json({
                message : 'Create Kelas Success',
                data:result
            });
            next()
        })
        .catch(err =>{
            next(err);
        })
}