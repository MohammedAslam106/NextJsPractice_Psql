'use client'
import axios from "axios"
import { useEffect, useState } from "react"
export default function VerifyEmail(){
    const [token,setToken]=useState('')
    const [verified,setVerified]=useState(false)
    const verifyUserEmail=async()=>{
        try {
            const resposne=await axios.post('/api/users/verifyemail',{token})
            console.log(resposne)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const urlToken=window.location.search.split('=')[1]
        setToken(urlToken || '')
        console.log(urlToken)
    },[])

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail()
        }
    },[token])
    return(
        <>
            <div className=" grid place-items-center h-screen w-full">
                <div >
                    <h1 className=" text-center text-2xl bg-orange-500 text-white p-3">Verify email</h1>
                    <h2>
                        {token}
                    </h2>
                </div>
            </div>
        </>
    )
}