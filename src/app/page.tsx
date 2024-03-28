import Link from 'next/link'
import React from 'react'
import {redirect} from 'next/navigation'
export default function page() {
  redirect('/signin')
  return (
    <div className=' p-4 bg-gray-900 h-[100vh]'>
    </div>
  )
}
