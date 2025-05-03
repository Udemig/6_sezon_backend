import express, {Router} from 'express'
import { createGig, deleteGig, getAllGigs, getGig } from '../controllers/gig.controller.ts';








// 1) Router oluştur

const router:Router = express.Router();

// 2) router yollarını belirleyelim

// /api/gigs/

router
    .route('/')
    .get(getAllGigs)
    .post(createGig);



// /api/gigs/123

router.route('/:id')
    .get(getGig)
    .delete(deleteGig)
    // .patch(updateGig)


// router'ı app'te kullanmak adına export edelim
export default router;