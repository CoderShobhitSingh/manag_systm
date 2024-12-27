import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500'>
    <h1 className='text-5xl mt-10 font-bold'>MedRec</h1>

    <div className='flex justify-center items-center min-h-screen justify-evenly h-64 w-full'>
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
    </div>
    </>
  );
};

export default Home;
