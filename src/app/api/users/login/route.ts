import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken'


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        console.log(reqBody)
        const readDb=await  User.findOne({username:reqBody.username})
        console.log(readDb)
        if(!readDb){
            return NextResponse.json({error:'User not exist!'})
        }
        const comparePassword=await bcryptjs.compare(reqBody.password,readDb.password)
        console.log(comparePassword)
        if(!comparePassword){
            return NextResponse.json({error:'Wrong Password!'})
        }
        const token=jwt.sign({
            id:readDb._id,
            username:readDb.username,
            password:readDb.password
        },process.env.SECRETE_KEY!,{expiresIn:'1d'})
        console.log(token)
        const response=NextResponse.json({message:'login successfully'})
        response.cookies.set('token',token,{httpOnly:true})
        return response
    } catch (error:any) {
        console.log(error.message || error)
    }
}