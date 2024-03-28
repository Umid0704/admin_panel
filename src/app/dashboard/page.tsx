'use client'
import React,{useEffect, useState } from 'react'
import ModalBook from './ui/ModalBook'
import Search from './ui/Search'
import Pagination from './ui/Paginetion'
import {getUsers, deleteUser} from '../../../api/users.service'
import { Page, ISUser } from '../../../types/user.types'
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Saidbar from './ui/Saidbar'
export default function page({searchParams}:{searchParams:{query:string , page:string}}) {
  const q = searchParams?.query || ''
    const count = Number(searchParams.page)   ||  1
    const [rolesValue, setRolesValue] =useState('admin')
    const roles = async(e:any)=>{
      const role = e.target.value
        let roleOne = await localStorage.setItem('roles',role)
        setRolesValue(role)

        fn()
    }
    const role = localStorage.getItem('roles')
    const payload:Page = {q,count, rolesValue }
    const [users, setUsers] = useState<ISUser[]>([])
    const fn = async()=>{
        let data = await getUsers(payload)
        setUsers(data?.data)

    }
    useEffect(()=>{fn()
    },[])
    const [open, setOpen]=useState(false)
    const [bar, setBar]=useState(false)
  const [value,setValue] = useState('')
    const handleDelete=async(id:any)=>{
        const data = await deleteUser(id)
        window.location.reload()
    }
    const openmodal=()=>{
        setOpen(true)
        setValue('')
      }
      const closeModal =()=>{
        setOpen(false)
      }
      const close=(e:any)=>{
        if(e.target.id === 'container' ){
          setOpen(false)
        }
        }
        const handleEdit=(item:any)=>{
            console.log(item, 'item')
            setOpen(true)
            setValue(item)
        }
        const handleBar=()=>{
          if(bar === false){
              setBar(true)
              
          }else{
              setBar(false)
          }
      }
  return (
      <div className={'bg-gray-900 text-white flex flex-col p-4 relative'}>
       <div id='container' onClick={close} className={open === false ? ' hidden' : '  absolute top-0 h-[100vh] flex  justify-center z-30  backdrop-blur w-[100%]'}>
         <ModalBook setOpen={setOpen} open={open} value={value} setValue={setValue}/>
        </div>
        <div className='md:flex justify-between'>
            <div className='flex md:hidden justify-between'>
            <button onClick={handleBar} className='md:hidden'><FaBars className='w-[24px] h-[24px]'/></button>
        <button className=' md:block px-5 py-2 bg-green-500 rounded-lg ' onClick={() => setOpen(true)}>add user</button>
        <div className={bar === false ? 'hidden' : ' absolute top-0 left-0 w-[100%] '}>
                    <div className=' flex bg-gray-800 px-4 py-4 '>
                <div className='w-[90%] '><Saidbar/></div>
                <IoClose className='w-[24px] h-[24px]' onClick={handleBar} />
                </div>
                </div>
            </div>
            <div className='flex gap-4'>
                <Search/>
                <select defaultValue={rolesValue} className='bg-[#2e374a] px-4 py-1 w-[48%] md:w-[250px] rounded-lg ' onChange={roles}>
                    <option  value='admin'>admin</option>
                    <option  value='employee'>employee</option>
                </select>
                
            </div>
            <button className='hidden md:block px-5 py-2 bg-green-500 rounded-lg ' onClick={() => setOpen(true)}>add user</button>
        </div>
          <div className='flex flex-wrap justify-center md:justify-between py-4'>
            {users?.map((item, index)=>(
                <div key={index} className='p-4 text-center flex flex-col gap-1'>
                    <img className='w-[250px] h-[250px] rounded-[50%]' src={`http://localhost:8080/${item?.avatar}`}
                         alt=""/>
                    <h1>First name: {item?.first_name}</h1>
                    <h1>Last name: {item?.last_name}</h1>
                    <h1>Username: {item?.username}</h1>
                    <h1>Age: {item?.age}</h1>
                    <h1>Role: {item?.role}</h1>

                    <div className='flex justify-between mt-1'>
                        <button className='px-10 py-2 bg-green-500 rounded-lg  ' onClick={()=>handleEdit(item)}>Edit
                        </button>
                        <button className='px-10 py-2 bg-red-500 rounded-lg  '
                                onClick={()=>handleDelete(item?._id)}>Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
          <Pagination count={count} />
      </div>
  )
}
