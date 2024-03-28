'use client'
import React, { useState,useEffect } from 'react'
// import { getGuides } from './../../../api/guides.service';
import Search from '../dashboard/ui/Search';
import ModalGuides from '../dashboard/ui/ModalGuides';
import { ISGuide } from '../../../types/guides.types';
import Pagination from '../dashboard/ui/Paginetion';
import UserCard from './ui/UserCard'
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Saidbar from './ui/siadbarUser'

import { getUserGuides, getUserMe } from '../../../api/userBuidesBulk.service';
export default function Author({searchParams}:{searchParams:{query:string , page:string}}) {
    const q = searchParams?.query || ''
    const count = Number(searchParams.page)   ||  1
    const [users, setUsers] = useState([])
    const [guides,setGuides] = useState<ISGuide[]>([])
    const [value,setValue] = useState('')
    const [bar,setBar] = useState(false)
    const [id,setId] = useState<string>('')

    const [open,setOpen] = useState(false)
    const handleChek=(e:any)=>{
        const chek = localStorage.setItem('chek', e?.target?.value)
    }
    const fn2 = async()=>{
        console.log(id)
         const payload:any = {q,count,   id }
         let data:any =await getUserGuides(payload)
         setGuides(data?.data?.data)
     }
    const fn =async()=>{
        const response = await getUserMe()
        const idv  = localStorage.setItem('id',response?.data?.data?._id)
        fn2()
    }
    useEffect(()=>{     
       fn()
    },[])
    const handleBar=()=>{
        if(bar === false){
            setBar(true)
            
        }else{
            setBar(false)
        }
    }
    return (
        <div className='text-white p-4 relative  flex flex-col gap-4'>
            <div className='flex justify-between w-[100%]'>
               <button onClick={handleBar} className='md:hidden'><FaBars className='w-[24px] h-[24px]'/></button>

                <select onChange={handleChek} className='bg-gray-700 pr-6   pl-2 py-1 rounded-lg ' >
                    <option value='true'>true</option>
                    <option value='false'>false</option>
                </select>
                <div className={bar === false ? 'hidden' : ' absolute top-0 left-0 w-[100%] '}>
                    <div className=' flex bg-gray-800 px-4 py-4 '>
                <div className='w-[90%] '><Saidbar/></div>
                <IoClose className='w-[24px] h-[24px]' onClick={handleBar} />
                </div>
                </div>
            </div>
            <div className='flex'>
                <div className='flex gap-4 flex-wrap w-full  '>
                    {
                        guides?.map((item:ISGuide)=>(
                            <div key={item?._id}  className=' '>
                                <UserCard item={item}  />
                            </div>
                        ))}
                </div>
            </div>
            <Pagination count={count}/>
        </div>
    )
}
