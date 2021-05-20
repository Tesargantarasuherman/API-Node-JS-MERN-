const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KelasSelesai = new Schema({
    id_subkelas: {
        type: String,
        required: true
    },
    id_user: {
        type: String,
        required: true
    },
    selesai_kelas: {
        type: Number,
        required: true
    },
}, {timestamps: true})


module.exports = mongoose.model('KelasSelesai',KelasSelesai)