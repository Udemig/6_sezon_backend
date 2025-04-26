const c = require("../utils/catchAsync");
const Review = require("../models/reviewModel");
const factory = require("./handlerFactory");



// bütün incelemeleri al
exports.getAllReviews = factory.getAll(Review);

// inceleme oluştur

exports.createReview = factory.createOne(Review);

// tek bir inceleme al
exports.getReview = factory.getOne(Review);

// reviewı güncelle
exports.updateReview = factory.updateOne(Review);

// Reviewı sil

exports.deleteReview = factory.deleteOne(Review);