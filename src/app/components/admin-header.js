"use client"
import Link from 'next/link'

const AdminHeader = () => {
  return (
    <div className='bg-cyan-700 flex flex-1 py-4 justify-between px-[10%]'>
    <a href="" className='text-white font-semibold'>Ecommerce</a>
     <div className='flex gap-5'>
     <Link href="" className='text-white font-semibold'>Home</Link>
     <Link href="" className='text-white font-semibold'>Login</Link>
     <Link href="" className='text-white font-semibold'>Register</Link>
     </div>
    </div>
  )
}

export default AdminHeader