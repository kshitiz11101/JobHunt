import React, { useState } from 'react'
import { TbAsset } from 'react-icons/tb';
import SignUp from '../components/SignUp';
const SignUpPage = () => {
   
  return (
    <div className='min-h-screen flex flex-col items-center lg:flex-row bg-mine-shaft-900'>
          <div className='w-[50vw] h-[100vh]'>
          <div className=' h-full rounded-r-[200px] bg-mine-shaft-800 flex items-center justify-center flex-col'>
           <div className='flex gap-1 items-center'>
           <TbAsset className='text-cyan-/-aqua-500 ' size={200}/>
            <div className='text-4xl lg:text-6xl font-semibold text-cyan-/-aqua-500'>Job Hunt</div>
           </div>
         <div className='text-lg lg:text-2xl text-mine-shaft-200 font-semibold '>Find the job made for you</div>
          </div>
          </div>
          <div className='w-full lg:w-1/2 flex justify-center py-8 lg:py-0'>
          <SignUp/>

          </div>
    </div>
  )
}

export default SignUpPage
