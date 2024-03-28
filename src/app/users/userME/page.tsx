"use client"
import React, { useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { getUserMe } from '../../../../api/userMe.service'
import Saidbar from '../ui/siadbarUser'
const UserMe_Obj = {
    first_name: "",
    last_name: "",
    age: "",
    username: "",
    role: "",
    password: "",
    total_guides: "",
    todo_guides: "",
    read_guides: ""
}
export default function Dashboard() {
    const [userMe, setUserMe] = useState()
    const [bar, setBar] = useState(false)
    const [userMeModla, setUserMeModal] = useState<boolean>(false)
    const openModal = () => {
        setUserMeModal(true)
    }
    const toggle = () => {
        setUserMeModal(false)
    }
    const fetchData = async () => {
        try {
            const response = await getUserMe ()
            setUserMe(response?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    const handleBar=()=>{
        if(bar === false){
            setBar(true)
            
        }else{
            setBar(false)
        }
    }
    console.log(bar)
    return (
        <div>
            
            <div className='flex items-center  justify-between gap-[10px] text-white fixed top-0 right-0 z-20 bg-gray-900 w-[100%] md:w-[80%]  py-[15px] px-[50px] border-b border-[#555]'>
                <h3 className='hidden md:block'>Shaxsiy ma'lumotlar</h3>
               <button onClick={handleBar} className='md:hidden'><FaBars className='w-[24px] h-[24px]'/></button>
                <button onClick={openModal} className='text-[#fff] bg-blue-700 py-[8px] px-[15px] rounded-[5px]'>edit </button>
                <div className={bar === false ? 'hidden' : ' absolute top-0 left-0 w-[100%] '}>
                    <div className=' flex bg-gray-800 px-4 py-4 '>
                <div className='w-[90%] '><Saidbar/></div><IoClose className='w-[24px] h-[24px]' onClick={handleBar} />
                </div>
                </div>
            </div>

            <div className='md:flex sm:border-[1px]  justify-around flex-wrap text-white  h-[500px] my-[100px] sm:mx-[50px] p-[20px]'>
                <div className=' md:flex-[2_2_0%]  h-[200px]'>
                    <img src={`http://localhost:8080/${userMe?.avatar}`} alt='user' className=' rounded-[50%] w-[200px] ' />
                </div>
                <div className=" md:flex-1 flex   flex-col" >
                    <div>
                        <h6 className=' '>First Name: <span className=' font-[600] font-mono'> {userMe?.first_name}</span></h6>
                        <h6>Last Name: {userMe?.last_name}</h6>
                        <h6>Age: {userMe?.age}</h6>
                        <h6>Username: {userMe?.username}</h6>
                        <h6>Role: {userMe?.role}</h6>
                        {/* <h6>Password: {userMe?.password}</h6> */}
                        <h6>Umumiy Qoidalar: {userMe?.total_guides}</h6>
                        <h6>aecacaa: {userMe?.todo_guides}</h6>
                        <h6>Qo'llanmalarni o'qing: {userMe?.read_guides}</h6>
                        <h6>description: {userMe?.description}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}