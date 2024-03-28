import React, { useState } from 'react'
import { addGuides, creadGuides } from '../../../../api/guides.service'
import { ISGuide } from '../../../../types/guides.types'
export default function ModalGuides({setOpen, close, value, setValue}:any) {
 const [imgLink, setImgLink]=useState('')
 const closeModal=()=>{
  setOpen(false)
  setValue('')
 }
 const formAction=async(formData:FormData)=>{
      const title = formData.get('title')
      const content = formData.get('content')
      let payload:ISGuide = {
        content: content ? content : value?.content,
        title : title ? title  : value?.title ,
        notify: false
      }
      if(value?.title){
        let data:{payload:ISGuide, id:string} = {
          payload, 
          id: value?._id
        }
        console.log(data)
        creadGuides(data)
      }else{
        addGuides(payload)
      }
      setValue('')
 }
  return (
    <div  className='w-[400px] p-4 bg-white text-black shadow shadow-white rounded-lg'>
        <form id="form" action={formAction} >
             <input defaultValue={value?.title} className='px-4 py-2 w-full border-b-2 outline-none' type="text" name='title' placeholder='title' />
             <input defaultValue={value?.content} className='px-4 py-2 w-full border-b-2 outline-none' type="text" name='content' placeholder='content'/>
             </form>
             <div className='text-white flex justify-around mt-4'>
                <button type='button' className='px-4 py-2 bg-yellow-500'  onClick={closeModal} >close</button>
                <button type='submit' className='px-4 py-2 bg-green-500'   form="form" >add</button>
                </div>
    </div>
  )
}
