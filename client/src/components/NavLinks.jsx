import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const NavLinks = ({role}) => {
  const user=useSelector((state)=>state.userDetail);
  const applicantLinks=[
    { name: 'Find Jobs', url: "/find-jobs" },
    {name:'Saved Jobs', url:"/saved-jobs"},
    { name: 'About', url: "/about" }
  ]
  const employerLinks = [
    { name: 'Post Jobs', url: "/post-jobs" },
    { name: 'About', url: "/about" },
    {name:'Posted Jobs', url:"/posted-jobs"}
  ]
    const navlinks=[
        {name:'Home',url:"#home"},
        {name:'About',url:"/about"},
        {name:'Services',url:"#services"},
        {name:'Contact us',url:"/contact"},
      
    ]
    let links = navlinks;
    if (role === 'APPLICANT') {
        links = applicantLinks;
    } else if (role === 'EMPLOYER') {
        links = employerLinks;
    }
    
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
