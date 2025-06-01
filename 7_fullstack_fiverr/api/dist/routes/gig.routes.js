import express from "express";
import { getAllGigs, getGig, createGig, deleteGig } from "../controllers/gig.controller.js";
import protect from "../middlewares/protect.js";
import upload from "../utils/multer.js";
// 1) router oluşturma
const router = express.Router();
// 2) endointleri belirle
router
    .route("/")
    .get(getAllGigs)
    .post(protect, upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 6 },
]), createGig);
router.route("/:id").get(getGig).delete(protect, deleteGig);
// 3) router'ı app'e tanıtmak için export et
export default router;
