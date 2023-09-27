"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"  //in this line if you import the useRouter from next/router as suggested you should get an error so change it to navigation
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

export default function SignupPage(){
    const router=useRouter()
    const [user,setUser]=useState({
        name:'',
        username:'',
        password:''
    })

    const [loading,setLoading]=useState(false)

     async function onSignup(){
        try {
            setLoading(true)
            const response=await axios.post('api/users/signup',user)
            console.log(response)
            if(response){
                toast.success('Signup successfully!')
            }
            console.log(response)
            router.push('/login')
        } catch (error:any) {
            toast.error(error.message)
            console.log(error.message || error)
        }finally{
            setLoading(false)
        }
     }
    return(
        <>
        {/* <Toaster position="top-center" /> */}
            <div className=" w-full h-screen flex justify-center items-center">
                <div className=" p-8 border shadow-lg flex flex-col justify-center items-center">
                    <h1 className=" text-center font-semibold text-2xl">
                        {loading ? 'Processing' : 'Signup'}
                    </h1>
                    <ul className=" flex flex-col justify-center gap-3">
                        <li className=" flex flex-col justify-center">
                            <label>Name</label>
                            <input onChange={(e)=>setUser({...user,name:e.target.value})} type="text" placeholder="Name" className=" rounded py-2 px-3 shadow-sm text-gray-400 border border-gray-400" />
                        </li>
                        <li className=" flex flex-col justify-center">
                            <label>Username</label>
                            <input onChange={(e)=>setUser({...user,username:e.target.value})} type="email" placeholder="Username" className=" rounded py-2 px-3 shadow-sm text-gray-400 border border-gray-400" />
                        </li>
                        <li className=" flex flex-col justify-center">
                            <label>Password</label>
                            <input onChange={(e)=>setUser({...user,password:e.target.value})} type="password" placeholder="Password" className=" rounded py-2 px-3 shadow-sm text-gray-400 border border-gray-400" />
                        </li>
                    </ul>
                    <button onClick={()=>{
                        onSignup()
                    }}
                    className=" mt-5 w-full py-2 px-4 rounded shadow-sm bg-blue-400 text-white font-semibold">
                        Signup
                    </button>
                    <Link className=" mt-1 text-blue-500 underline" href={'/login'}>Already have an account?</Link>
                </div>
            </div>
        </>
    )
}