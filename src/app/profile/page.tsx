'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import {useState} from 'react'
import Link from 'next/link'


export default function ProfilePage(){
    const [data,setData]=useState('')
    const router=useRouter()
    const onLogout=async()=>{
        const response=await axios.get('api/users/logout')
        if(response){
            console.log(response)
            router.push('/login')
        }
    }

    const getUserDetails=async()=>{
        try {
            const response=await axios.get('api/users/me')
            console.log(response.data)
            setData(response.data.data._id)
        } catch (error:any) {
            console.log(error.message || error)
        }
    }

    return(
        <>
            <div className=" flex flex-col w-full h-screen justify-center items-center">
                <h1 className=" text-2xl font-semibold">
                    {data==''?'User not found':<Link className='py-2 px-4 rounded shadow-sm bg-green-700 hover:bg-green-500' href={`profile/${data}`}>{data}</Link>}
                </h1>
                <button onClick={onLogout} className=" mt-4 font-semibold py-2 px-4 rounded shadow-sm text-white bg-blue-400 focus:ring-1 hover:focus:ring-4" type="button">Logout</button>
                <button onClick={getUserDetails} className=" mt-4 font-semibold py-2 px-4 rounded shadow-sm text-white bg-blue-400 focus:ring-1 hover:focus:ring-4" type="button">Get Details</button>

            </div>

        </>
    )
}