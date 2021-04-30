const kursus = require('../models/kursus');
const instruktur = require('../models/instruktur');
const KelasModel = require('../models/kelas');
const SubKelasModel = require('../models/subkelas');

exports.tambahKursus = (req, res, next) => {
    let data_instruktur = []
    instruktur.findById(req.body.id_instruktur).then(instruktur => {
        data_instruktur = instruktur
        
        let Kursus = new kursus({
            data_instruktur: data_instruktur,
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
    });


}
exports.detailKursus = (req, res, next) => {
    const id = req.params.kursusId;


    kursus.findById(id).then(result => {
        if (!result) {
            const err = new Error('ID Tidak Di Temukan');
            error.errorStatus = 404;
            throw error;
        } else {
            let data_kursus = result;
            let data_kelas = [];

            KelasModel.find({id_kursus: result._id}).then(kelas => {
                instruktur.findById(result.id_instruktur).then(instruktur => {
                    res.status(200).json({
                        message: 'Data Kursus Berhasil Di Panggil',
                        data: {
                            data_kursus,
                            instruktur,
                            kelas
                        }
                    });
                });
            })
        }

    }).catch(err => {
        next(err);
    })
}
exports.semuaKursus = (req,res,next)=>{
    let data = new Object();
    
    kursus.find().then(result => {
        instruktur.findById(result.id_instruktur).then(instruktur=>{
            res.status(200).json({
                message: 'Data Kursus Berhasil Di Panggil',
                data: {
                    result,
                    instruktur
                }
            });
        })




    }).catch(err => {
        next(err);
    })

}
