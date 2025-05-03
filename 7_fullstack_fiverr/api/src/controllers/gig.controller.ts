import { ReqParams } from "../types/index.ts";



export const getAllGigs = ({req,res}:ReqParams) => {

    res.status(200).send({message:"/api/gigs'e GET isteği attınız"})
    return;
}

export const createGig = ({req,res}:ReqParams) => {

    res.status(200).send({message:"/api/gigs'e POST isteği attınız"})
    return;
}


export const getGig = ({req,res}:ReqParams) => {

    res.status(200).send({message:"/api/gigs/:id'e GET isteği attınız"})
    return;
}

export const deleteGig = ({req,res}:ReqParams) => {

    res.status(200).send({message:"/api/gigs/:id'e DELETE isteği attınız"})
    return;
}
