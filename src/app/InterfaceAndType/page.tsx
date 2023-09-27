import {ImportingFunction} from '@/helpers/toImportTypeOfFunction'
import { FC } from 'react'

interface pageProps{
    name:string,
    age:number
}

type CustomerProps={
    name:string,
    age:number,
    phone:number,
    email:string
}

export function InterfaceAndType({name,age,phone,email}:CustomerProps){
    return{
        name,
        age,
        phone,
        email
    }
}

export default function ParentFunction({}:pageProps){
    const{name,age}=InterfaceAndType({name:'aslam',age:23,phone:9485,email:'aslam@aslam'})
    return(
        <>
            <div>
                <h1>{name}</h1>
                <h1>{age}</h1>
            </div>
        </>
    )
}