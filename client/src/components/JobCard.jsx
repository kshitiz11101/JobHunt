import React, { useState, useEffect } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import SearchJobs from "./SearchJobs";
import { apiRequest } from "../services";
import { toast } from "react-toast";
import JobDetails from "./JobDetails";
import { useDispatch, useSelector } from "react-redux";
import { removeSavedJobs, saveJob, setJobs, setJobDetails } from "../redux/jobSlice";

const JobCard = () => {
  const [Alljobs, setAllJobs] = useState([]);
  
  const [selectedJobId, setSelectedJobId] = useState(null);
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.jobs.savedJobs);
  
  const fetchJobs = async (filters = {}) => {
    try {
      const filteredQuery = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value));
      const res = await apiRequest({
        method: "GET",
        url: "/jobs/searchJobs",
        params: filteredQuery,
      });
      dispatch(setJobs(res));
      console.log("Jobs fetched successfully", res);
      setAllJobs(res);
    } catch (error) {
      console.log("Error in fetching jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (filters) => {
    fetchJobs(filters);
  };

  const handleSavedJobs = (job) => {
    const isSaved = savedJobs.some((savedJob) => savedJob.id === job.id);
    if (isSaved) {
      dispatch(removeSavedJobs(job.id));
      toast.success("Job Deleted from saved jobs Successfully");
    } else {
      dispatch(saveJob(job));
      toast.success("Job Saved Successfully");
    }
  };
  const formatDate=(str)=>{
    const date=new Date(str);
    const day=date.getDate();
    const months=["Jan","Feb","Mar","Apr", "May", "June", "July", "Aug","Sept","Oct","Nov","Dec"];
    const month =months[date.getMonth()];
    const year = date.getFullYear();
    const ordinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
  }
  return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
}

  const handleJobClick = (job) => {
    setSelectedJobId(job.id);
    dispatch(setJobDetails(job)); 
  };
  

  if (selectedJobId) {
    return <JobDetails jobId={selectedJobId} backTo={() => setSelectedJobId(null)} />;
  }

  return (
    <>
      <SearchJobs onSearch={handleSearch} />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-mine-shaft-950 ">
        {Alljobs.map((job, index) => (
          <div
            key={index}
            onClick={(e) => handleJobClick(job)}
            className="p-4 bg-mine-shaft-900 rounded-md flex flex-col gap-1 hover:shadow-[0_0_5px_1px_cyan] shadow-cyan-500 hover:cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <img className="w-1/3 " src={`/companies/${job.company}.png`} alt={job.company} />
                <div        className="font-semibold text-mine-shaft-200 text-lg">
                  {job.jobTitle}
                </div>
              </div>
              <div  onClick={(e) => { e.stopPropagation(); handleSavedJobs(job); }}>
                {savedJobs.some((savedJob) => savedJob.id === job.id) ? (
                  <FaBookmark className="text-cyan-/-aqua-500 text-xl hover:text-cyan-/-aqua-700 cursor-pointer" />
                ) : (
                  <FaRegBookmark className="text-cyan-/-aqua-500 text-xl hover:text-cyan-/-aqua-700 cursor-pointer" />
                )}
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
              Posted: <span className="text-mine-shaft-100 font-semibold">{formatDate(job.postedOn)}</span>
            </div>
            <div className="flex gap-2 text-mine-shaft-200 text-lg font-semibold">
              Salary: <span className="text-cyan-/-aqua-500">{job.salary}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default JobCard;
