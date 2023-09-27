'use client'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from 'axios'
import { toast } from "react-hot-toast/headless"

export default function LoginPage(){
    const [user,setUser]=useState({
        username:'',
        password:''
    })
    const [loading,setLoading]=useState(false)
    const router=useRouter()

    async function onLogin(){
        try {
            setLoading(true)
            const response=await axios.post('api/users/login',user)
            console.log(response)
            router.push('/profile')
        } catch (error:any) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return(
        <>
            <div className=" w-full h-screen flex justify-center items-center">
                <div className=" p-8 border shadow-lg flex flex-col justify-center items-center">
                    <h1 className=" text-center font-semibold text-2xl">
                        {loading?'Processing':'Login'}
                    </h1>
                    <ul className=" flex flex-col justify-center gap-3">
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
                        onLogin()
                    }} className=" mt-5 w-full py-2 px-4 rounded shadow-sm bg-blue-400 text-white font-semibold">Login</button>
                    <Link className=" text-blue-400 underline mt-5" href={'/signup'}>New user? Signup!</Link>
                </div>
            </div>
        </>
    )
}