import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <h1 className='flex justify-center items-center pt-8 font-bold	text-5xl	'>MedRec</h1>
    <div className='flex justify-center items-center min-h-screen justify-evenly'>
      {/* New User Section */}
      <Link to="/signup" className='flex justify-center items-center flex-col cursor-pointer'>
        <div>
          <img className='rounded-full bg-gray-500' src="../Public/new.png" alt="New User" />
        </div>
        <div>
          <h2 className='text-2xl font-extrabold italic'>New User</h2>
        </div>
      </Link>

      {/* Existing User Section */}
      <Link to="/login" className='flex justify-center items-center flex-col cursor-pointer'>
        <div>
          <img className='rounded-full bg-gray-500' src="../Public/old.png" alt="Existing User" />
        </div>
        <div>
          <h2 className='text-2xl font-extrabold italic'>Existing User</h2>
        </div>
      </Link>
    </div>
    </>
  );
};

export default Home;
