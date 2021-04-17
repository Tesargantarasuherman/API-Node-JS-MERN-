const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Kelas = new Schema({
    id_kursus: {
        type: String,
        required: true
    },
    judul: {
        type: String,
        required: true
    },
    posisi: {
        type: String,
        required: true
    },
}, {timestamps: true})

// module.exports = mongoose.model('nama_model','format_model)

module.exports = mongoose.model('Kelas',Kelas)