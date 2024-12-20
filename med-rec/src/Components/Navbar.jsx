import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between p-6 flex-wrap bg-blue-300'>
        <h1 className='font-bold text-lg '>MedRec</h1>
        <input className='bg-gray-200 pl-2 rounded-xl w-80 h-7 text-sm outline-none' type="text" placeholder='enter the product name'/>
        <div className=''>
            <button>Login</button>
            <button className='pl-5'>Logout</button>
            <button className='pl-5'>Signup</button>
        </div>
    </div>
  )
}

export default Navbar