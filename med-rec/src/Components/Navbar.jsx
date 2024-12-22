import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between p-10 flex-wrap bg-blue-300'>
        <h1 className='font-bold text-lg '>MedRec</h1>
        <input className='bg-gray-200 pl-2 rounded-xl w-80 h-7 text-sm outline-none' type="text" placeholder='enter the product name'/>
        <div>
            <ul className='flex'>
              <li className='cursor-pointer	'>Login</li>
              <li className='pl-5 cursor-pointer'>Logout</li>
            </ul>
            
        </div>
    </div>
  )
}

export default Navbar