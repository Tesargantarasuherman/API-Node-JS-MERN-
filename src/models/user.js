const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        enum:["basic","admin"],
        default:"basic",
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password:{
        type : String,
        required: true
    }
    
}, {timestamps: true})

// module.exports = mongoose.model('nama_model','format_model)

module.exports = mongoose.model('User',User)