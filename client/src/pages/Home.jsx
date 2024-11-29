import React from 'react'
import Header from '../components/Header'
import DreamJob from '../components/DreamJob'
import Companies from '../components/Companies'
import JobCategory from '../components/JobCategory'
import Working from '../components/Working'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']" id='home'>
    <Header/>
    <DreamJob/>
    <Companies/>
    <JobCategory/>
    <Working/>
    <Testimonials/>
    <Footer/>
    </div>
    </>
    
  )
}

export default Home