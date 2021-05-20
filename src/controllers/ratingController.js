const RatingKursus = require('../models/ratingKursus');

exports.tambahRating = (req, res, next) => {

    RatingKursus.findOne({id_user: req.body.id_user, id_kursus:req.body.id_kursus}).then(result => {
        if (!result) {
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
        }else{
            res.status(400).json({ message: 'Rating Sudah Di Tambahkan'});
        }
    })



}
exports.detailRating = (req, res, next) => {

    let idKursus = req.params.idKursus
    let ratingTotalAwal = [];
    let ratingTotalAkhir = 0;
    let ratingFinal = 0;
    RatingKursus.find({ id_kursus: idKursus }).then(result => {
        result.forEach(rating => {
            ratingTotalAwal.push(rating.rating)
        });
        ratingTotalAwal.forEach(ratingTotal => {
            ratingTotalAkhir += ratingTotal
        })
        ratingFinal = ratingTotalAkhir / ratingTotalAwal.length
        res.status(201).json({ message: 'detail rating', data: result, total_rating: ratingFinal });
        next()
    }).catch(err => {
        next(err);
    })

}