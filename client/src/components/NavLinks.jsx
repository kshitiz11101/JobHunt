import React from 'react'
import { Link } from 'react-router-dom'

const NavLinks = () => {
    const links=[
        {name:'Find Jobs',url:"find-jobs"},
        {name:'Find Talent',url:"find-talent"},
        {name:'Upload Jobs',url:"Uplaod-jobs"},
        {name:'About',url:"about"}
    ]
  return (
    <div className="hidden md:flex space-x-8">
        {
            links.map((link,index)=>
            <div key={index}>
            <Link key={index} to={link.url} className='text-gray-300 hover:text-white font-semibold'>{link.name}</Link>
            </div>
            )
            
        }
  </div>
  )
}

export default NavLinks
