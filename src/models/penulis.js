const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Penulis = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
}, {timestamps: true})

// module.exports = mongoose.model('nama_model','format_model)

module.exports = mongoose.model('Penulis',Penulis)