

// eğer parametre kısmında 4 tane parametre varsa nextjs bunun Error Middleware'i olduğunu otomatik olarak anlar.

import { NextFunction, Request, Response } from "express"
import { ExtendedError } from "../helpers/error.ts"

export default (err:ExtendedError,req:Request,res:Response,next:NextFunction) => {
    const statusCode = err.status || 500

    const message = err.message || "Bilinmeyen bir hata oluştu."

    res.status(statusCode).json({
        status:"error",
        message
    })

    return
}