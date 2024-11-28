import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiRequest } from '../services';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmBox from './ConfirmBox';
import PostJob from './PostJob';
import { useNavigate } from 'react-router-dom';
const PostedJobs = () => {
    const user=useSelector((state)=>state.userDetail);

    const [postedJobs,setPostedJobs]=useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [isBoxOpen, setIsBoxOpen]=useState(false);
    const [selectedJob,setSelectedJob]=useState(null);
    const [isEdit,setIsEdit]=useState(false);
    const token=useSelector((state)=>state.jwtToken);
    const navigate=useNavigate();
    const fetchPostedJobs=async()=>{
        try {
            const res=await apiRequest({
                url:'/jobs/postedJobs',
                method:"GET",
                token,
            })
              console.log("Jobs posted:",res);
              
            setPostedJobs(res);
            
        } catch (error) {
            console.log(`Error in fetching the jobs posted by ${user.name}`);
        }
    };

    useEffect(()=>{
        fetchPostedJobs();
    },[]);
    const handleDeleteJob=async()=>{
        try {
            const res=await apiRequest({
                url:`/jobs/deleteJob/${selectedJobId}`,
                method:"DELETE",
                token,
            });
            console.log(`Job deleted successfully: `,res);
            setIsBoxOpen(false);
            fetchPostedJobs();

        } catch (error) {
            console.log("Error in deleting job");
            
        }
    }

    const handleEditJob=(job)=>{
      setSelectedJob(job);
      setIsEdit(true);
    }
    const openDeleteBox=(jobId)=>{
      setSelectedJobId(jobId);
      setIsBoxOpen(true);
    }
    const closeDeleteBox=()=>{
      setIsBoxOpen(false);
    }
    const viewApplicants=(jobId)=>{
      navigate(`/applicants/${jobId}`)
    }
  return (
    <>
      {!isEdit ? (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-mine-shaft-950">
          {postedJobs.map((job, index) => (
            <div
              key={index}
              className="p-4 bg-mine-shaft-900 rounded-md flex flex-col gap-1 hover:shadow-[0_0_5px_1px_cyan] shadow-cyan-500 hover:cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <img className="w-1/3 " src={`/companies/${job.company}.png`} alt={job.company} />
                  <div className="font-semibold text-mine-shaft-200 text-lg">{job.jobTitle}</div>
                </div>
                <div className="flex gap-2">
                  <FaEdit
                    className="text-cyan-/-aqua-500 text-xl hover:text-cyan-/-aqua-700 cursor-pointer"
                    onClick={() => handleEditJob(job)} 
                  />
                  <FaTrash
                    className="text-cyan-/-aqua-500 text-xl hover:text-cyan-/-aqua-700 cursor-pointer"
                    onClick={() => openDeleteBox(job.id)}
                  />
                </div>
              </div>
              <div className="text-md text-mine-shaft-200 mb-2">Positions Available: {job.applicants}</div>
              <div className="flex gap-2 text-sm">
                <div className="p-1 bg-mine-shaft-800 text-cyan-/-aqua-500 rounded-lg">{job.experience}</div>
                <div className="p-1 bg-mine-shaft-800 text-cyan-/-aqua-500 rounded-lg">{job.jobType}</div>
                <div className="p-1 bg-mine-shaft-800 text-cyan-/-aqua-500 rounded-lg">{job.location}</div>
              </div>
              <div className="text-mine-shaft-100 text-justify">{job.description}</div>
              <div className="text-sm text-mine-shaft-300">
                Posted On : <span className="text-mine-shaft-100 font-semibold">{job.postedOn}</span>
              </div>
              <div className="text-sm text-mine-shaft-300">
                Salary : <span className="text-cyan-/-aqua-500 font-semibold">{job.salary}</span>
              </div>
              <button
              onClick={()=>viewApplicants(job.id)}
              className='mt-4 self-end bg-none border border-cyan-/-aqua-500 p-2 rounded-lg hover:bg-cyan-/-aqua-500 hover:text-white text-cyan-/-aqua-500 '>
                View Applicants
              </button>
            </div>
          ))}
        </div>
      ) : (
            <PostJob job={selectedJob}/> 
      )}

      <ConfirmBox
        isOpen={isBoxOpen}
        onClose={closeDeleteBox}
        onConfirm={handleDeleteJob}
        message="Are you sure you want to delete this job?"
        confirmText="Delete"
        cancelText="Cancel"
      />
     
    </>    
)
}

export default PostedJobs
