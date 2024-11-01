import React from 'react'
import { TbAsset } from 'react-icons/tb'
import {CiFacebook, CiLinkedin} from 'react-icons/ci';
import {FaXTwitter} from 'react-icons/fa6';
import { footerLinks } from '../utils/data';
const Footer = () => {
  return (
    <div className='mt-10 pb-5 flex gap-5 justify-around bg-mine-shaft-900 p-2 '>
        <div className='w-1/4 flex flex-col gap-4 px-2 '>
            <div className='flex gap-1 items-center text-cyan-/-aqua-400'>
            <TbAsset className="h-8 w-auto text-cyan-/-aqua-500 " />
            <div className='text-xl font-semibold'>JobHunt</div>
            </div>
            <div className='text-sm text-mine-shaft-300 '>
            Job Portal with user profiles,skill,updates,certifications,work experience and admin job postings.
            </div>
            <div className='flex gap-3 text-cyan-/-aqua-400 [&>div]:bg-mine-shaft-900 [&>div]:rounded-sm hover:[&>div]:text-cyan-/-aqua-600 cursor-pointer'>
           <div><CiFacebook size={30}/></div> 
           <div><CiLinkedin size={30}/></div> 
           <div><FaXTwitter size={30}/></div> 
            </div>
        </div>
        {
            footerLinks.map((foot,index)=><div>
            <div key={index} className='text-lg font-semibold text-cyan-/-aqua-500'>{foot.title}</div>
            {
                foot.link.map((item,ind)=>
                <div key={ind} className='text-mine-shaft-300 cursor-pointer hover:text-cyan-/-aqua-500 hover:translate-x-1 transition duration-300 ease-in-out'>{item}</div>
                )
            }
            </div>
            )
        }
    </div>
  )
}

export default Footer