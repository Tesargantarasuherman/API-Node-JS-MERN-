const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPost = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image:{
        type : String,
        // file save to DIGITAL OCEAN
        required: true
    },
    author:{
        type:Object,
        required: true
    }
}, {timestamps: true})

// module.exports = mongoose.model('nama_model','format_model)

module.exports = mongoose.model('BlogPost',BlogPost)
