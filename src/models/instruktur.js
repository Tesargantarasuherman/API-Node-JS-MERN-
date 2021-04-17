const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Instruktur = new Schema({
    nama: {
        type: String,
        required: true
    },
    keterangan: {
        type: String,
    },
    foto_profile: {
        type: String,
        required: true
    },
}, {timestamps: true})

// module.exports = mongoose.model('nama_model','format_model)

module.exports = mongoose.model('Instruktur',Instruktur)