const express = require("express");

const {
    getAllReviews,
    getReview,
    deleteReview,
    createReview,
    updateReview
} = require('../controllers/reviewController');
const { protect } = require("../controllers/authController");


// router belirliyoruz ki /api/reviews'a atılan bütün istekler buraya düşsün
const router = express.Router();

// Routes


// /api/reviews
router.route("/").get(getAllReviews).post(protect,createReview);

// /api/reviews/:id ===>   /api/reviews/1
router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview)

module.exports = router;