import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import {TbAsset} from 'react-icons/tb';
import NavLinks from './NavLinks';
const Header = () => {
  return (
    <header className="bg-mine-shaft-950 text-white">
    <nav className=" mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
      
        <div className="flex-shrink-0">
          <a href="/" className="flex items-center">
        
            <TbAsset className="h-8 w-auto text-cyan-/-aqua-500" />
            <span className="ml-2 text-xl text-cyan-/-aqua-500 font-bold">JobHunt</span>
          </a>
        </div>   
     {NavLinks()}
        <div className="flex items-center space-x-2">
          <button className="text-gray-300 hover:text-white border border-cyan-500 px-2 py-2 rounded-md">
            Login/Signup
          </button>

          <div className="relative">
            <button className="text-gray-300 hover:text-white">
              <IoMdNotificationsOutline className="h-8 w-8  bg-mine-shaft-900 rounded-full" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
  )
}

export default Header
