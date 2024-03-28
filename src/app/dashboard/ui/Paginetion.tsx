"use client"
import React from 'react'
import Button from '@mui/material/Button';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
export default function Pagination({count}:{count:number | undefined}){
    const searchParams = useSearchParams()
    const {replace} = useRouter()
    const pathname = usePathname()
    const params = new URLSearchParams(searchParams ? searchParams : "")
    const page = Number(params.get("page")) || 1
    const ITEM_PER_PAGE = 2
    const hasPrev = ITEM_PER_PAGE * (page - 1) > 0
    const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < Number(count)

    const handleChangePage = (type: string)=>{
        console.log('type')
        type === "prev" ? params.set("page", (page - 1).toString()) :
            params.set("page", (page + 1).toString())
        replace(`${pathname}?${params}`)
         setTimeout(()=>{window.location.reload()
         },1000)
    }
    return(
        <div className='flex  justify-between'>
            <Button variant="text" onClick={()=>handleChangePage("prev")}>Previous</Button>
            <Button variant="text" onClick={()=>handleChangePage("next")}>Next</Button>
        </div>
    )
}
