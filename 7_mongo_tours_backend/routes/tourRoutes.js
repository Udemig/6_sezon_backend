//turlar ile alaklaı API'da tanımlanacak bütün endpointleri / route'ları bu dosyada tanımlanır.

const express = require("express");
const {
  getAllTours,
  createTour,
  updateTour,
  deleteTour,
  getTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController.js");
const formatOuery = require("../middleware/formatOuery.js");
const { protect } = require("../controllers/authController.js");
const {restrictTo} = require("../controllers/authController.js")

const router = express.Router();

// ------------ yollar -------------

// client zaten /api/tours'a doğru parametrelerle istek atarsa aynı sonucu alıcak ama param sayısı fazla olduğundan bazı durumlarda parametrleri client'tan istemek yerine önden bizim belirledğimiz route'lar oluşturmak client'ın işiini kolaylaştırır
router.route("/top-tours").get(aliasTopTours, getAllTours);

// turların istatistiklerinin alınması için route
// gerçek seneryo: admin paneli için zorluğa göre turların istatisklerini hesapla
router.route("/tour-stats").get(protect,restrictTo("admin"),getTourStats);

// gerçek seneryo: admin paneli için parametre olarak gelen yılın he rayında kaç tur başlayacak hesapla.
router.route("/monthly-plan/:year").get(getMonthlyPlan);

router.route("/").get(formatOuery, getAllTours).post(createTour);

router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
