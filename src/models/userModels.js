const mongoose=require('mongoose')

const userShcema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgetPasswordToken:String,
    forgetPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyToeknExpiry:Date,
    
},{timestamps:true})

const User=new mongoose.model('User',userShcema)

module.exports=User;