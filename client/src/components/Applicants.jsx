import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { apiRequest } from '../services'
import { FaEye, FaLink, FaLinkedin } from 'react-icons/fa'

const Applicants = () => {
    const {jobId}=useParams();
    const [applicants,setApplicants]=useState([]);
    const navigate=useNavigate();
    const fetchApplicants=async()=>{
        try {
            const res=await apiRequest({
                url:`/applicant/getAllApplicants/${jobId}`,
                method:"GET"
            })
            setApplicants(res);

        } catch (error) {
            console.log("Error in fetching applicants" ,error);
        }
    }
    useEffect(()=>{
        fetchApplicants();
    },[jobId]);
  return (
    <>
    <Header/>
    <div className=' p-6 bg-mine-shaft-900'>
        <h2 className='text-2xl font-semibold text-center text-mine-shaft-100 mb-6'>Applicants of this Job:</h2>
    <button onClick={()=>navigate(-1)} className="text-lg self-start mb-2 bg-none border border-cyan-/-aqua-500 hover:bg-cyan-/-aqua-500 text-mine-shaft-100 rounded-md px-6 py-2 hover:text-mine-shaft-900 ">Back</button>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 rounded-lg '>
            {applicants.length>0?(
               applicants.map((applicant)=>(
                <div key={applicant.id} className='p-4 bg-mine-shaft-900 rounded-md flex flex-col gap-2 shadow-lg cursor-pointer hover:shadow-cyan-/-aqua-500 transition-shadow'>
                <img src="/Avatars/Avatar1.jpg" alt="Applicant" className="h-40 object-contain rounded-full mb-2"/>
                <h3 className='text-2xl font-semibold text-mine-shaft-100 flex justify-center'>{applicant.name}</h3>
                <p className="text-cyan-/-aqua-500">Email: {applicant.email}</p>
                <p className="text-cyan-/-aqua-500">Phone: {applicant.phone}</p>
                                    <div className='flex gap-2'>
                                    <FaEye className='text-cyan-/-aqua-500 mt-2' />
                                    <a
                                    href={applicant.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-500  hover:text-cyan-700"
                                >
                                    View Resume
                                </a>
                                    </div>
                                <div className='flex gap-2'>
                                    <FaLink className='text-cyan-/-aqua-500 mt-2' />
                                <a
                                    href={applicant.portfolio}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-500  hover:text-cyan-700"
                                >
                                    Portfolio
                                </a>
                                    </div>    
                                <div className='flex gap-2'>
                                    <FaLinkedin className='text-cyan-/-aqua-500 mt-2'/>
                                <a
                                    href={applicant.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-500  hover:text-cyan-700"
                                >
                                    LinkedIn
                                </a>
                                </div>
                               
                                {/* <p className="text-mine-shaft-300 mt-2 text-justify">
                                    Cover Letter: {applicant.coverLetter}
                                </p> */}

                </div>
               ))     
            ):
            (
                <p className="text-center text-mine-shaft-300 col-span-3">
                            No applicants found for this job.
                        </p>
            )
        }
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Applicants