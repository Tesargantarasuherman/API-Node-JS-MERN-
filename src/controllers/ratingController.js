const RatingKursus = require('../models/ratingKursus');

exports.tambahRating = (req, res, next) => {


    let Rating = new RatingKursus({
        id_kursus: req.body.id_kursus,
        id_user: req.body.id_user,
        rating: req.body.rating,
        review: req.body.review
    })
    Rating.save().then(result => {
        res.status(201).json({ message: 'Rating Berhasil Di Tambahkan', data: result });
        next()
    }).catch(err => {
        next(err);
    })

}