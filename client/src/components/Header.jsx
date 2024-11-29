import React, { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import {TbAsset} from 'react-icons/tb';
import NavLinks from './NavLinks';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user=useSelector((state)=>state.userDetail);
  
  const handleLogout=()=>{
    dispatch(logout());
    navigate('/');

  }
  // console.log(user);
  
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
      <nav>
        <NavLinks role={user.accountType}/>
      </nav>
        <div className="flex items-center space-x-4">
          {
            
            user?.name?(

              <>
              
              <div className='relative'>
              <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img src='/Avatars/Avatar1.jpg' alt="user-profile" className="w-8 h-8 rounded-full" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-cyan-500">{user.accountType}</p>
                  </div>
                  <IoMdArrowDropdown className="h-5 w-5 text-gray-400" />
                </button>
              </div>
                {dropdownOpen && (
                    <div className="absolute right-2 top-12 mt-2 w-48 bg-mine-shaft-600 rounded-md shadow-lg py-1 z-10">
                    <a href="/user-profile" className="block px-4 py-2 text-sm text-mine-shaft-100 hover:bg-cyan-/-aqua-600">User Profile</a>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-mine-shaft-100 hover:bg-cyan-/-aqua-600">Logout</button>
                  </div>
                )}
              </>
            ):(
            <>
             <button onClick={()=>navigate('/login')} className="text-gray-300 hover:text-white border border-cyan-500 px-2 py-2 rounded-md">
            Login/Signup
          </button>
            </>
            )
          }
         
        </div>
      </div>
    </nav>
  </header>
  )
}

export default Header
