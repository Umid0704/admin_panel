import Link from 'next/link'
import React from 'react'

export default function Saidbar() {
    return (
        <div className='bg-gray-800  h-[100vh] text-white flex flex-col gap-4 p-4'>
            <Link className='text-[30px]' href='/users'>user</Link>
            <Link className='text-[30px]' href='/users/userME'>About</Link>
        </div>
    )
}
