const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Kursus = new Schema({
    judul_kursus: {
        type: String,
        required: true
    },
    foto_kursus: {
        type: String,
        required: true
    },
    harga_kursus: {
        type: String,
        required: true
    },
    tipe_kursus: {
        type: String,
        required: true
    },
    data_instruktur:{
        type: Object,
        required: true
    }
}, {timestamps: true})

// module.exports = mongoose.model('nama_model','format_model)

module.exports = mongoose.model('Kursus',Kursus)