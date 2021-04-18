const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubKelas = new Schema({
   id_kelas: {
        type: String,
        required: true
    },
    judul: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    link_video: {
        type: String,
        required: true
    },
    id_kelas_sebelumnya: {
        type: String,
    },
    id_kelas_selanjutnya: {
        type: String,
    },
    posisi: {
        type: String,
        required: true
    },
}, {timestamps: true})

// module.exports = mongoose.model('nama_model','format_model)

module.exports = mongoose.model('SubKelas',SubKelas)