import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response=NextResponse.json({message:'logout successfully!'})
        response.cookies.set('token','',{httpOnly:true,expires:new Date()});
        // response.cookies.delete('token')
        return response
    } catch (error:any) {
        return NextResponse.json({error:error.message || error})
    }
}