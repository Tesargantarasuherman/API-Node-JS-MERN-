const instruktur = require ('../models/instruktur');

exports.tambahInstruktur = (req,res,next) =>{

        let Instruktur = new instruktur({
            nama :req.body.nama,
            keterangan:req.body.keterangan,
            foto_profile:req.body.foto_profile,
        })
        Instruktur.save().then(result =>{
            res.status(201).json({
                message : 'Create Instruktur Success',
                data:result
            });
            next()
        })
        .catch(err =>{
            next(err);
        })
}
