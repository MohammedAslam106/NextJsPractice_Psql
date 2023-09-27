'use client'
 
// import { useSearchParams } from 'next/navigation'
export default function SubProfile({params}:any){
    // const searchParams = useSearchParams();
    // const search: string[]=[]
    // searchParams.forEach((param)=>{
    //     console.log(param)
    //     search.push(param)
    // })
    // console.log(search)
    return(
        <>
            <div>
                This is sub profile {params.id}
            </div>
        </>
    )
}