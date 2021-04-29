const KelasModel = require ('../models/kelas');
const TransaksiModel = require ('../models/transaksi');

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
exports.ambilKelasSaya = (req,res,next)=>{
    let idUser = req.params.idUser;
    TransaksiModel.find({id_user : idUser}).then(result => {
        res.status(200).json({
            message: 'Data Kelas Saya Berhasil Di Panggil',
            data: {
                result
            }
        });
    })
}