import React from 'react'
import JobCard from '../components/JobCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
const FindJobs = () => {
  return (
    <>
    <div className='min-h-screen bg-mine-shaft-950 w-auto h-auto'>
    <Header/>
    <JobCard/>
    <br />
    <br />
    
    <Footer/>
    </div>
    </>
    )
}

export default FindJobs
