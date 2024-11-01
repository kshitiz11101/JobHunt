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
    {name:'Posted Jobs', url:`/posted-jobs/${user.id}`}
  ]
    const navlinks=[
        {name:'Find Jobs',url:"/find-jobs"},
        {name:'Find Talent',url:"/find-talent"},
        {name:'Upload Jobs',url:"/Upload-jobs"},
        {name:'About',url:"/about"},
      
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
