import User from '@/models/userModels'
import { NextRequest,NextResponse } from 'next/server'
import { connect } from '@/dbConfig/dbConfig'
import bcryptjs from 'bcryptjs'
import { sendMail } from '@/helpers/mailer'

connect()
export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        console.log(reqBody)
        console.log(12)
        const readDb=await User.findOne({username:reqBody.username})
        if(readDb){
            return NextResponse.json({error:'user already exist'},{status:400})
        }
        const hashPassword=await bcryptjs.hash(reqBody.password,10)
        const newUser= new User({
            name:reqBody.name,
            username:reqBody.username,
            password:hashPassword
        })

        const userSaved=await newUser.save()
        console.log(userSaved)

        // email verification
        await sendMail({email:reqBody.username,emailType:'VERIFY',userId:userSaved._id})
        return NextResponse.json({response:userSaved})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message || error})
    }
}