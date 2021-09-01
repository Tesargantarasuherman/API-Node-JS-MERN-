const express = require('express');
const bodyParsers = require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const base_URL = '' ;
const app = express();
var corsOptions = {
    origin: '*',
    credentials : true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
   }
  
  app.use(cors(corsOptions));


const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const instrukturRoutes = require('./src/routes/instruktur');
const kursusRoutes = require('./src/routes/kursus');
const kelasRoutes = require('./src/routes/kelas');
const subKelasRoutes = require('./src/routes/subkelas');
const transaksiRoutes = require('./src/routes/transaksi');
const ratingRoutes = require('./src/routes/rating');

// setup multer
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
// end setup multer
app.use(bodyParsers.urlencoded({ extended: true }))

// middleware multer
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
// end middleware multer

app.use(bodyParsers.json());
// Handle error to call image
app.use('/image', express.static(path.join(__dirname, 'images')))
/* jika ada pemanggilan route images */
// end handle error to call image

app.use(function (req, res, next) {	
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');   
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Content-Type", "application/x-www-form-urlencoded");
    next();
})
// endpoint first
app.use('/v1/rating', ratingRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);
app.use('/v1/instruktur', instrukturRoutes);
app.use('/v1/kursus', kursusRoutes);
app.use('/v1/kelas', kelasRoutes);
app.use('/v1/subkelas', subKelasRoutes);
app.use('/v1/transaksi', transaksiRoutes);
// function errors
app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})
// mongoose.connect('mongodb+srv://iamsuherman:*Password*@cluster0.w3nsw.mongodb.net/*Database_name*?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true })
mongoose.connect('mongodb+srv://iamsuherman:Fk89tTvm6Yx48qrM@cluster0.w3nsw.mongodb.net/blog?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(3001, () => console.log('Connection Success'));
}).catch(err => console.log(err));
