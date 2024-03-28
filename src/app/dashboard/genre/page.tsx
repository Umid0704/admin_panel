"use client"
// import { getUserMe } from '@/api-service/userMe.service'
// import { IUserMe } from '@/types/userMe.types'
import Image from 'next/image'
// import img from "@/assets/user_image2.jpg"
import React, { useEffect, useState } from 'react'
import { getUserMe } from '../../../../api/userMe.service'
// import UserMeModal from '../Modals/UserMeModal/page'
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

    return (
        <div>
            {/* <UserMeModal open={userMeModla} toggle={toggle} /> */}
            <div className='flex items-center  justify-between gap-[10px] text-white fixed top-0 right-0 z-20 bg-gray-900 w-[80%]  py-[15px] px-[50px] border-b border-[#555]'>
                <h3>Shaxsiy ma'lumotlar</h3>
                <button onClick={openModal} className='text-[#fff] bg-blue-700 py-[8px] px-[15px] rounded-[5px]'>edit </button>
                {/* <GuidesSearch /> */}
            </div>

            <div className='flex border-[1px] text-white w-[90%] h-[500px] my-[100px] mx-[50px] p-[15px]'>
                <div className=' flex-3'>
                    <Image src='' alt='user' className='w-[200px] h-[200px] rounded-[50%]' />
                </div>
                <div className=" flex-1 flex  items-center flex-col" >
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