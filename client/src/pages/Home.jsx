import React from 'react'
import Header from '../components/Header'
import DreamJob from './DreamJob'
import Companies from '../components/Companies'
import JobCategory from '../components/JobCategory'
import Working from '../components/Working'

const Home = () => {
  return (
    <>
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
    <Header/>
    <DreamJob/>
    <Companies/>
    <JobCategory/>
    <Working/>
    </div>
    </>
    
  )
}

export default Home