'use client'
import React, { useState,useEffect } from 'react'
import ModalGuides from '../ui/ModalGuides'
import { getGuides } from '../../../../api/guides.service'
import BasicCard from '../ui/cardGuides'
import Pagination from './../ui/Paginetion';
import Search from '../ui/Search'
import { ISGuide } from '../../../../types/guides.types'
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Saidbar from '../ui/Saidbar'
export default function Author({searchParams}:{searchParams:{query:string , page:string}}) {
  const q = searchParams?.query || ''
  // const regex = new RegExp(q)
  const count = Number(searchParams.page)   ||  1
    const roles = async (e)=> {
        const role = e.target.value
        let roleOne =await localStorage.setItem('rolesguides',role)
        fn()
    }
    const role = localStorage.getItem('rolesguides')
  const payload = {q,count }
  const [users, setUsers] = useState([])
  const [guides,setGuides] = useState<ISGuide[]>([])
  const [value,setValue] = useState('')
  const [open,setOpen] = useState(false)
  const [bar, setBar]=useState(false)
    const fn =async()=>{
     let data =await getGuides(payload)
       setGuides(data?.data?.data)
    }
    useEffect(()=>{
      fn()
    },[])
    const openmodal=()=>{
      setOpen(true)
      setValue('')
    }
    const close=(e:any)=>{
      if(e.target.id === 'container' ){
        setOpen(false)
      }
      }
      const handleBar=()=>{
        if(bar === false){
            setBar(true)
            
        }else{
            setBar(false)
        }
    }
  return (
    <div className='text-white sm:p-4 relative  flex flex-col gap-4'>
       <div>
       <div className='flex justify-between w-[100%]'>
        <div className='flex md:hidden justify-between w-full px-4 py-2'>
            <button onClick={handleBar} className='md:hidden'><FaBars className='w-[24px] h-[24px]'/></button>
        <button className=' md:block px-5 py-2 bg-green-500 rounded-lg ' onClick={() => setOpen(true)}>add user</button>
        <div className={bar === false ? 'hidden' : ' bg-gray-900 h-[100vh] z-50  absolute top-0 left-0 w-[100%] '}>
                    <div className=' flex bg-gray-800 px-4 py-4 '>
                <div className='w-[90%] '><Saidbar/></div>
                <IoClose className='w-[24px] h-[24px]' onClick={handleBar} />
                </div>
                </div>
            </div>
       </div>
          {/* ... */}
            <div className='flex gap-4 w-[100%] md:w-auto'>
                <Search/>
                <select defaultValue={role}className='bg-[#2e374a] px-4 py-1 w-[48%] md:w-[250px] rounded-lg ' onChange={roles}>
                    <option value='asc'>asc</option>
                    <option value='desc'>desc</option>
                </select>
            </div>
            <button className=' hidden md:block  px-4 py-1 bg-green-500  rounded-lg' onClick={openmodal}>add Auther</button>
        </div>
        <div className='flex'>
            <div id='container' onClick={close}
                 className={open === false ? ' hidden' : '  absolute top-0 h-[100vh] flex items-center justify-center z-30  backdrop-blur w-[100%]'}>
                <ModalGuides setOpen={setOpen} open={open} value={value} setValue={setValue}/>
            </div>
            <div className='flex gap-4 justify-center md:justify-between flex-wrap w-full  '>
     {
        guides?.map((item:ISGuide)=>(
          <div key={item?._id}  className=' '>
            <BasicCard item={item} setValue={setValue} setOpen={setOpen} />
          </div>
        ))
      }
     </div>
    </div>
     <Pagination count={count}/>
    </div>
  )
}
