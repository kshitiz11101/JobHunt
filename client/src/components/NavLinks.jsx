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
            <div>
            <Link key={index} to={link.url} className='text-gray-300 hover:text-white font-semibold'>{link.name}</Link>
            </div>
            )
            
        }
    {/* <a href="/" className="text-gray-300 hover:text-white font-semibold">Home</a>
    <a href="/services" className="text-gray-300 hover:text-white font-semibold ">Services</a>
    <a href="/about" className="text-gray-300 hover:text-white font-semibold">About</a>
    <a href="/contact" className="text-gray-300 hover:text-white font-semibold">Contact</a> */}
  </div>
  )
}

export default NavLinks
