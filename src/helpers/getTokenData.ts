import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export async function getDataFromToken(request:NextRequest){
    try {
        const cookieRequest=request.cookies.get('token')?.value || '';
        const tokenVerify:any=jwt.verify(cookieRequest,process.env.SECRETE_KEY!)
        return tokenVerify.id;
    } catch (error:any) {
        console.log(error.message || error)
    }
}