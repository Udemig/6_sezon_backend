import express,{ NextFunction, Router, Request, Response } from "express";
import { register, login, logout, profile} from "../controllers/auth.controller.ts";
import { ReqParams } from "../types/index.ts";






// 1) bu route'a (auth || yetkilendirme) atılan isteklerin yönetilebilmesi için burada bir router oluşturmak zorundayız.
// /api/auth/
const router: Router = express.Router()


// 2) yolları belirle

// router.route("/").get(({req,res}:ReqParams)=>{
    
//     res.status(200).send({message:"Bu Auth Route"})
//     return;
// })

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/logout').post(logout)

router.route('/profile').get(profile)

export default router;