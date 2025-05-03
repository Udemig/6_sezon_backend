import { NextFunction, Request, Response } from "express"
import User, { IUser } from "../model/user.model.ts"
import catchAsync from "../helpers/index.ts"
import bcrypt from 'bcrypt';
import error from "../helpers/error.ts";
import jwt,{SignOptions} from 'jsonwebtoken'

type SignOptions

// Kaydol ------------- Register

export const register = catchAsync(
    async (req: Request, res: Response): Promise<void> => {

        const user = req.body

        // kullanıcının şifresini saltla ve hashle ve user password olarak belirle
        user.password = bcrypt.hashSync(user.password, 12);

        if (!user) {
            res.status(404).send("Body'de kullanıcı yok.")
        }

        const newUser: IUser = await User.create(user)

        // clienta şifreyi göndermemek için passwordu kaldırılmış kullanıcı gönderelim
        const { password, ...userWithoutPass } = newUser.toObject();

        res.status(201).json({ success: true, message: "Kullanıcı başarıyla oluşturuldu.", data: userWithoutPass })
        return;

    })


// Giriş Yap ----------- Login

export const login = catchAsync(

    async (req: Request, res: Response, next:NextFunction): Promise<void> => {

        // isme göre kullanıcı ara

        const user: IUser | null = await User.findOne({
            username:req.body.username
        })

        // kullanıcı nullsa(bu username'e sahip kullanıcı yoksa)
        if (!user) return next(error(404,"Girdiğiniz bilgilere ait kullanıcı bulunamadı."));

        //veritabanındaki hashlenmiş şifreyle, istekten gelen normal şifreyi kıyas edelim.

        const isCorrect = bcrypt.compareSync(req.body.password,user.password);

        // şifreler eşleşmiyorsa hata gönderelim
        if (!isCorrect) return next(error(403,"Girdiğiniz bilgiler yanlış."));

        const expiresIn = process.env.JWT_DURATION || "1d"

        // şifre doğruysa JWT token oluştur
        const token = jwt.sign(
            // şifrelenip imzalanacak veri
            {id: user._id, isSeller:user.isSeller},
            // şifre çözümü için kullanılan rastgele belirlediğimiz key
            process.env.JWT_KEY as string,
            // şifreleme seçenekleri örn. son kullanma tarihi
            {
                expiresIn: process.env.JWT_DURATION as string
            }
        );


        // giriş yapıldığında kullanıcıya kullanıcı verisini gönder ama şifreyi kaldır
        user.password = "";


        res
        .cookie("token", token, {
            httpOnly: false,
            sameSite: "lax",
            // ms cinsinden bir gün
            expires: new Date(Date.now() + 1 * 24 * 3600 * 1000)
        })
        .status(200)
        .json({ message: "Hesaba giriş yapıldı.", token, user})
    }

)


// Çıkış Yap ---------- Logout


export const logout = async (req: Request, res: Response) => {
    res.status(200).send({ message: "/api/auth/logout'a istek attınız." })
    return
}


// Profile Eriş --------- Get Profile

export const profile = async (req: Request, res: Response) => {
    res.status(200).send({ message: "/api/auth/profile'a istek attınız." })
    return
}