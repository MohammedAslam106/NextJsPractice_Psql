import mongoose from "mongoose";

export async function connect() {
   try{
        await mongoose.connect(`${process.env.MONGO_DB_URL}/nextjspractice`)
        const connection=mongoose.connection  //after mongoose.connect we can use connection and write listeners as below
        connection.on('connected',()=>{
            console.log('connected to mongodb')
        })
   }catch(error){
    console.log('somthing went wrong!')
    console.log(error)
   }
}