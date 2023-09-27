import nodemailer from 'nodemailer'
import User from '@/models/userModels'
import bcryptjs from 'bcryptjs'

export const sendMail=async({email,emailType,userId}:any)=>{
    try {
        const hashedToken=await bcryptjs.hash(userId.toString(),10)
        if(emailType=='VERIFY'){
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyToeknExpiry:Date.now()+3600000
            })
        }else if(emailType=='RESET'){
            await User.findByIdAndUpdate(userId,{
                forgetPasswordToken:hashedToken,
                forgetPasswordTokenExpiry:Date.now()+3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "18fd1e402b40c8",
              pass: "63d03cb138b9d1"
            }
          });

        const mailOptions={
            from:'mohammedaslam4106@gmail.com',
            to:email,
            subject:emailType=='VERIFY'?'verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
                ${emailType === "VERIFY" ? "Verify your email":
                "reset your password"}</p>`
        }
        return await transport.sendMail(mailOptions)
    } catch (error:any) {
        console.log(error.message || error)
    }
}