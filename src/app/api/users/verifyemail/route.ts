import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest,NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody= await request.json()
         const user=await User.findOne({verifyToken:reqBody.token,verifyToeknExpiry:{$gt:Date.now()}})
         if(!user){
            return NextResponse.json({error:'user not found'})
         }
         user.isVerified=true
         user.verifyToken=null
         user.verifyToeknExpiry=null
         await user.save()

         return NextResponse.json({message:'verified mail successully'})
    } catch (error:any) {
        console.log(error.message || error)
    }
}