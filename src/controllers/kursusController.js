const kursus = require ('../models/kursus');
const instruktur = require('../models/instruktur');

exports.tambahKursus = (req,res,next) =>{

        let Kursus = new kursus({
            id_instruktur :req.body.id_instruktur,
            judul_kursus:req.body.judul_kursus,
            judul_kursus:req.body.judul_kursus,
            foto_kursus:req.body.foto_kursus,
            harga_kursus:req.body.harga_kursus,
            tipe_kursus:req.body.tipe_kursus,
        })
        Kursus.save().then(result =>{
            res.status(201).json({
                message : 'Create Kursus Success',
                data:result
            });
            next()
        })
        .catch(err =>{
            next(err);
        })
}
exports.detailKursus =(req,res,next) => {
    const id = req.params.kursusId ;
    kursus.findById(id)
    .then(result => {
        if(!result){
            const err = new Error('ID Tidak Di Temukan') ;
            error.errorStatus = 404;
            throw error ;    
        }
        else{
            instruktur.findById(result.id_instruktur).then(instruktur =>{
                res.status(200).json({
                    message:'Data Kursus Berhasil Di Panggil',
                    data_kursus:result,
                    data_instruktur:instruktur
                });
            })

        }

    })
    .catch(err =>{
        next(err);
    })
}
