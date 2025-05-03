import { NextFunction, Request, Response } from "express"

export type ReqParams = {
    req:Request
    res:Response
    next?:NextFunction
}