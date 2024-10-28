import React, { useEffect, useState } from 'react'
import { apiRequest } from '../services'
import {IoLocationSharp} from 'react-icons/io5';
import { FaBriefcase } from "react-icons/fa6";
import { FaRupeeSign,FaArrowLeft, FaRegBookmark } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setJobDetails } from '../redux/jobSlice';
const SkillBadge = ({ skill }) => (
    <span className="text-cyan-/-aqua-100 text-xl mr-2 px-2.5 py-0.5 rounded-lg cursor-pointer bg-none border border-cyan-/-aqua-500 hover:bg-cyan-/-aqua-500">
      {skill}
    </span>
  );
const JobDetails = ({jobId,backTo}) => {
    const [job,setJob]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        const getJobDetails=async()=>{
            try {
                const res=await apiRequest({
                    method:"GET",
                    url:`jobs/getJob/${jobId}`
                })
                setJob(res);
            } catch (error) {
            console.log("Error fetching the job",error);
            }
        };
        getJobDetails();
    }, [jobId]);
    if (!job) {
        return <div className="text-mine-shaft-100">Loading...</div>;
      }
   const handleApply=()=>{
    navigate(`/apply-jobs/${jobId}`);
   }
   const handleBackClick=()=>{
    dispatch(setJobDetails([]));
    backTo();
   }

  return (
    <div className="bg-mine-shaft-900 text-mine-shaft-100 p-4 shadow-lg ">
    <button onClick={handleBackClick} className="mb-4 flex items-center text-cyan-/-aqua-500 hover:text-cyan-/-aqua-600 text-xl ">
      <FaArrowLeft size={30} className="mr-2" />
      Back to Jobs
    </button>
    <div className="flex items-center mb-4">
      <div className="w-20 h-20 bg-mine-shaft-100 rounded-md flex items-center justify-center mr-2">
        <img src={`/companies/${job.company}.png`} alt={job.company} className="h-12" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-mine-shaft-100 ">{job.jobTitle}</h1>
        <p className="text-mine-shaft-200 text-lg">{job.company} • Posted {job.postedOn} • {job.applicants} Openings</p>
      </div>
      <button className="mx-auto text-cyan-/-aqua-500 hover:text-cyan-/-aqua-600">
          <FaRegBookmark size={24} />
        </button>
      <button
      onClick={handleApply}
      className=" text-mine-shaft-200 bg-none border-2 border-cyan-/-aqua-500 hover:bg-cyan-/-aqua-600 rounded-md text-2xl px-4 py-1">
          Apply
        </button>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="flex items-center">
        <IoLocationSharp className="text-cyan-/-aqua-500 mr-2" size={30} />
        <span className='text-xl text-mine-shaft-200'>{job.location}</span>
      </div>
      <div className="flex items-center">
        <FaBriefcase className="text-cyan-/-aqua-500 mr-2" size={30} />
        <span className='text-xl text-mine-shaft-200'>{job.experience}</span>
      </div>
      <div className="flex items-center">
        <FaRupeeSign className="text-cyan-/-aqua-500 mr-2" size={30} />
        <span className='text-xl text-mine-shaft-200'>{job.salary}</span>
      </div>
      <div className="flex items-center">
        <BiSolidZap className="text-cyan-/-aqua-500 mr-2" size={30} />
        <span className='text-xl text-mine-shaft-200'>{job.jobType}</span>
      </div>
    </div>

    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Required Skills</h2>
      <div className="flex flex-wrap gap-2">
        {job.skillsRequired.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-semibold mb-2">About The Job</h2>
      <p className="text-gray-300">{job.description}</p>
    </div>
    
    <div className='mt-2'>
      <h2 className="text-2xl font-semibold mb-2">Responsibilities</h2>
      <p className="text-gray-300">{job.responsibilities}</p>
    </div>

    {/* {
      applying && (
        <ApplicationForm
        jobTitle={job.jobTitle}
        company={job.company}
        onClose={()=>setApplying(false)}
        />
      )
    } */}
  </div>
  )
}

export default JobDetails
