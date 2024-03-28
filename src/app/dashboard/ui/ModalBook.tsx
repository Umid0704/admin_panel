import React, { ChangeEvent, Children, useEffect, useState } from 'react'
import { $api } from '../../../../api/interceptors'
import Image from 'next/image'
import { creadUser, addUser } from '../../../../api/users.service'
import { ISUser } from '../../../../types/user.types'
export default function ModalBook({setOpen, open, value, setValue}:any) {
  let [author, setAuthor]=useState([])
 const [imgLink, setImgLink]=useState('')
 const closeModal=()=>{
  setOpen(false)
  setValue('')
 }
 const imageLink=async(e:ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault()
    const file : File | null =  e.target.files && e.target.files[0]
    const form = new FormData()
    form.append('file', file as Blob)
    const respons = await $api.post('/upload', form)
    console.log(respons?.data?.path)
    setImgLink(respons?.data?.path)
 }
 const formAction=async(formData:FormData)=>{
      const first_name = formData.get('first_name')
      const last_name = formData.get('last_name')
      const age = formData.get('age')
      const role = formData.get('role')
      const username = formData.get('username')
      const password = formData.get('password')
      const description = formData.get('desc')
      const  ageNum = age ? age : value?.age
      let payload:ISUser = {
        avatar:imgLink ? imgLink : value?.avatar,
        first_name: first_name ? first_name : value?.first_name,
        age:Number(ageNum),
        last_name: last_name ? last_name : value?.last_name,
        role: role ? role  : value?.role,
        description: description ? description : value?.description,
        username:username ? username  : value.username,
        password:password ? password  : value.password
      }
     console.log(payload)
      if(value?.first_name){
        let data:{payload:ISUser, _id:string} = {
          _id:value?._id,
          payload
        }
        const fn = await creadUser(data)
      }else{
        const fn = await addUser(payload)
      }
setValue('')
     window.location.reload()
 }
 const handleModal=(item)=>{
      
 }
  return (
    <div  className='w-[400px] p-4 bg-white text-black shadow shadow-white rounded-lg '>
      <Image src={`http://localhost:8080/${imgLink}`} alt='user avatar'width={200} height={200} />
        <form className=' flex flex-col gap-1' id="form" action={formAction} >
              <input className='' defaultValue={value?.image} type="file" onChange={imageLink} />
              <input className='px-2 py-1 outline-none border-b border-black' defaultValue={value?.first_name} type="text"  placeholder='firs_name'  name='first_name' />
              <input className='px-2 py-1 outline-none border-b border-black' defaultValue={value?.last_name} type="text"  placeholder='last_name'  name='last_name' />
              <input className='px-2 py-1 outline-none border-b border-black' defaultValue={value?.age} type="number"  placeholder='age'  name='age'/>
            <select className='px-2 py-1 outline-none border-b border-black' defaultValue={value?.role} name="role" id="">
                <option value='employee'>employee</option>
                <option value='admin'>admin</option>

            </select>
            <input className='px-2 py-1 outline-none border-b border-black' defaultValue={value?.username} type="text"  placeholder='username' name='username'  />
              <input className='px-2 py-1 outline-none border-b border-black' defaultValue={value?.password} type="password" name='password'  placeholder='password'    />
              <input className='px-2 py-1 outline-none border-b border-black' defaultValue={value?.description} type="text" name='desc' placeholder='description' />
             </form>
             <div className='text-white flex justify-around mt-4'>
                <button type='button' className='px-4 py-2 bg-yellow-500' onClick={closeModal}>close</button>
                <button type='submit' className='px-4 py-2 bg-green-500' form="form" >add</button>
                </div>
    </div>
  )
}
