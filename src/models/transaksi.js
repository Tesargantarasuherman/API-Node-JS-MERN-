const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaksi = new Schema({
    id_kursus: {
        type: String,
        required: true
    },
    id_user: {
        type: String,
        required: true
    },
    harga_total: {
        type: String,
        required: true
    },
    status_transaksi: {
        type: Object,
    },
}, {timestamps: true})

// module.exports = mongoose.model('nama_model','format_model)

module.exports = mongoose.model('Transaksi',Transaksi)