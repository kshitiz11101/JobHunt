import React, { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';

const SavedJobs = () => {
   const savedJobs=useSelector((state)=>state.jobs.savedJobs);
  return (
    <>
    <Header/>
    <div className="min-h-screen p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-mine-shaft-950 ">
      {savedJobs.length === 0 ? (
        <p className="text-mine-shaft-100 text-2xl ">No saved jobs yet!</p>
      ) : (
        savedJobs.map((job, index) => (
          <div
            key={index}
            className="p-3 h-1/2 bg-mine-shaft-900 rounded-md flex flex-col gap-2 hover:shadow-[0_0_5px_1px_cyan] shadow-cyan-500 hover:cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <img
                  className="h-20 w-20"
                  src={`/companies/${job.company}.png`}
                  alt={job.company}
                />
                <div className="font-semibold text-mine-shaft-200 text-lg">
                  {job.jobTitle}
                </div>
              </div>
            </div>
            <div className="text-md text-mine-shaft-200 mb-2">
              Positions Available: {job.applicants}
            </div>
            <div className="flex gap-2 text-sm">
              <div className="p-1 bg-mine-shaft-800 text-cyan-/-aqua-500 rounded-lg">
                {job.experience}
              </div>
              <div className="p-1 bg-mine-shaft-800 text-cyan-/-aqua-500  rounded-lg">
                {job.jobType}
              </div>
              <div className="p-1 bg-mine-shaft-800 text-cyan-/-aqua-500  rounded-lg">
                {job.location}
              </div>
            </div>
            <div className="text-mine-shaft-100 text-justify line-clamp-2 overflow-hidden">
              {job.description}
            </div>
            <div className="text-sm text-mine-shaft-300">
              Posted:{" "}
              <span className="text-mine-shaft-100 font-semibold">
                {job.postedDaysAgo}
              </span>
            </div>
            <div className="flex gap-2 text-mine-shaft-200 text-lg font-semibold">
              Salary:{" "}
              <span className="text-cyan-/-aqua-500">{job.salary}</span>{" "}
            </div>
          </div>
        ))
      )}
    </div>
    <Footer/>
    </>
  )
}

export default SavedJobs