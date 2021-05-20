const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingKursus = new Schema({
    id_kursus: {
        type: String,
        required: true
    },
    id_user: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
}, {timestamps: true})

// module.exports = mongoose.model('nama_model','format_model)

module.exports = mongoose.model('RatingKursus',RatingKursus)