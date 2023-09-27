import { getDataFromToken } from "@/helpers/getTokenData";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request:NextRequest){
    try {
        const userId=await getDataFromToken(request)
        const user=await User.findOne({_id:userId}).select('-password -name')  //in this line .slect acts as a filter which will return the all the data accept password and name
        console.log(user)
        return NextResponse.json({message:'user found',data:user})
    } catch (error:any) {
        console.log(error.message || error)
        return NextResponse.json({error:error.message || error})
    }
}