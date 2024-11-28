import React, { useEffect, useState } from "react";
import { apiRequest } from "../services";
import {FaBuilding,FaBriefcase,FaRupeeSign,FaUserAlt,} from "react-icons/fa";
import { AiOutlineTags } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { toast, ToastContainer } from "react-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostJob = ({job}) => {
    const [jobDetails, setJobDetails] = useState({
        company: "",
        jobTitle: "",
        experience: "",
        jobType: "",
        skillsRequired: [],
        salary: "",
        location: "",
        description: "",
        applicants: "",
        postedOn: "",
        responsibilities:""
      });
     const user=useSelector((state)=>state.userDetail);
    const jobTitles = ["UI/UX Designer","Software Developer","Business Analyst","Product Manager","Marketing Specialist", "Data Analyst", "Sales Executive",];
      const skillsArray = ["JavaScript","React","Node.js", "Python","Java","SQL","CSS", "HTML"];
      const expLevel = ["Entry-Level", "Mid-Level", "High-Level"];
      const [customJobTitle, setCustomJobTitle] = useState(""); // For manual job title input
      const [isOtherSelected, setIsOtherSelected] = useState(false); // To track if "Other" option is selected
      const [isOtherSkillSelected, setIsOtherSkillSelected] = useState(false); // For tracking skill selection
      const [customSkill, setCustomSkill] = useState(''); // For manual skill input
      const token=useSelector((state)=>state.jwtToken);
      const navigate=useNavigate();
      
      const handleChange = (e) => {
    
        const { name, value } = e.target;
        setJobDetails((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleJobTitleChange = (e) => {
        const selectedJobTitle = e.target.value;
        if (selectedJobTitle === "Other") {
          setIsOtherSelected(true);
          setCustomJobTitle(""); // Reset custom job title
        } else {
          setIsOtherSelected(false);
          setJobDetails((prevData) => ({
            ...prevData,
            jobTitle: selectedJobTitle,
          }));
        }
      };
      const handleSkillSelect = (e) => {
        const selectedSkill = e.target.value;
        if (selectedSkill === "Other") {
          setIsOtherSkillSelected(true);
          setCustomSkill(''); // Reset custom skill input
        } else {
          setIsOtherSkillSelected(false);
          if (!jobDetails.skillsRequired.includes(selectedSkill)) {
            setJobDetails((prevData) => ({
              ...prevData,
              skillsRequired: [...prevData.skillsRequired, selectedSkill],
            }));
          }
        }
      };
    
      const handleRemoveSkill = (skillToRemove) => {
        setJobDetails((prevData) => ({
          ...prevData,
          skillsRequired: prevData.skillsRequired.filter(
            (skill) => skill !== skillToRemove
          ),
        }));
      };
      const handlePostJob = async (e) => {
        e.preventDefault();
        const today=new Date().toISOString().split('T')[0];
        const updatedJobDetails = {
          ...jobDetails,
          jobTitle: isOtherSelected ? customJobTitle : jobDetails.jobTitle,
          postedOn: today
        };
        console.log("Sending job posting request:", updatedJobDetails);
        
        try {
          if(job){
              const res=await apiRequest({
                url:`/jobs/updateJob/${job.id}`,
                method:"PUT",
                data:updatedJobDetails,
                token,
              });
              console.log("Job Updated Successfully",res);
              toast.success("Job Updated Successfully");
              navigate('/posted-jobs');            
          }
          else{
            const res=await apiRequest({
              url: `/jobs/addJob`,
            method: "POST",
            data: updatedJobDetails,
            token,
            });
            console.log("Job Posted Successfully", res);
          toast.success("Job Posted Successfully");
            navigate(`/posted-jobs`);
          }
        } 
        catch(error){
          console.log("Error in job posting or updating",error);   
        }
      };
      const handleCustomSkillInput = () => {
        if (customSkill && !jobDetails.skillsRequired.includes(customSkill)) {
          setJobDetails((prevData) => ({
            ...prevData,
            skillsRequired: [...prevData.skillsRequired, customSkill],
          }));
          setCustomSkill(''); // Clear custom skill input
          setIsOtherSkillSelected(false); // Hide input field after adding
        }
      };
      const handleBackClick=()=>{
        navigate("/");
      }
      useEffect(() => {
        if (job) {
          setJobDetails({
            ...job,
            postedOn: new Date(job.postedOn).toISOString().split('T')[0], // Adjust date format if needed
          });
        }
      }, [job]);
      const openPostBox=()=>{
        setIsBoxOpen(true);
      }
      const closePostBox=()=>{
        setIsBoxOpen(false);
      }
  return (
   <>
   <ToastContainer
    position="top-right"
    />
   
      <div className="bg-mine-shaft-900 min-h-screen p-6 flex flex-col items-center">
        <h1 className="text-3xl text-mine-shaft-100 mb-6 font-bold">
         {job? "Edit Job":"Post Job"}
        </h1>
        <button onClick={handleBackClick} className="text-lg self-start mb-2 bg-none border border-cyan-/-aqua-500 hover:bg-cyan-/-aqua-500 text-mine-shaft-100 rounded-md px-6 py-2 hover:text-mine-shaft-900 ">Back</button>
        <form
          onSubmit={handlePostJob}
          className="bg-mine-shaft-800 text-white p-8 rounded-md w-full grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Job Title */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Job Title</label>
            <div className="flex items-center border border-mine-shaft-500 rounded-md">
              <AiOutlineTags className="text-cyan-/-aqua-500 p-1" size={30} />
              <select
                name="jobTitle"
                value={jobDetails.jobTitle}
                onChange={handleJobTitleChange}
                className="w-full bg-mine-shaft-800 text-mine-shaft-100 p-3 focus:outline-none rounded-md"
              >
                <option value="" >Select Job Title</option>
                {jobTitles.map((title, index) => (
                  <option value={title} key={index}>
                    {title}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            {isOtherSelected && (
              <input
                type="text"
                name="customJobTitle"
                value={customJobTitle}
                onChange={(e) => setCustomJobTitle(e.target.value)}
                placeholder="Enter Job Title"
                className="w-full bg-mine-shaft-800 text-mine-shaft-100 p-3 mt-3 focus:outline-none rounded-md"
              />
            )}
          </div>

          {/* Company */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Company</label>
            <div className="flex items-center border border-gray-500 rounded-md">
              <FaBuilding className="text-cyan-/-aqua-500 p-1 " size={30} />
              <input
                type="text"
                name="company"
                value={jobDetails.company}
                onChange={handleChange}
                placeholder="Enter Company Name"
                className="w-full bg-mine-shaft-800 text-mine-shaft-100 p-3 focus:outline-none rounded-r-md"
              />
            </div>
          </div>

          {/* Job Type */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Job Type</label>
            <div className="flex items-center border border-gray-500 rounded-md">
              <FaBriefcase className="text-cyan-/-aqua-500 p-1" size={30} />
              <input
                type="text"
                name="jobType"
                value={jobDetails.jobType}
                onChange={handleChange}
                placeholder="Enter Job Type"
                className="w-full bg-mine-shaft-800 text-mine-shaft-100  p-3 focus:outline-none rounded-r-md"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">
              Experience Level
            </label>
            <div className="flex items-center border border-gray-500 rounded-md">
              <FaBriefcase className="text-cyan-/-aqua-500 p-1" size={30} />
              <select
                name="experience"
                value={jobDetails.experience}
                onChange={handleChange}
                className="w-full bg-mine-shaft-800 text-mine-shaft-100 p-3 focus:outline-none rounded-md"
              >
                <option value="">Select Experience Level</option>
                {expLevel.map((level, index) => (
                  <option key={index} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">
              Skills Required
            </label>
            <div className="flex items-center border border-gray-500 rounded-md">
              <GiSkills className="text-cyan-/-aqua-500 p-1" size={30} />
              <select
                name="skills"
                onChange={handleSkillSelect}
                className="w-full bg-mine-shaft-800 text-mine-shaft-100 p-3 focus:outline-none rounded-md"
              >
                <option value="">Select Skills</option>
                {skillsArray.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            {isOtherSkillSelected && (
                <div className="mt-3">
                <input
                  type="text"
                  name="customSkill"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="Enter Custom Skill"
                  className="w-full bg-mine-shaft-800 text-mine-shaft-100 p-3 focus:outline-none rounded-md"
                />
                <button
                  type="button"
                  className="mt-2 bg-cyan-/-aqua-500 text-gray-800 p-2 rounded-md font-semibold hover:bg-cyan-/-aqua-600"
                  onClick={handleCustomSkillInput}
                >
                  Add Skill
                </button>
              </div>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              {jobDetails.skillsRequired.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-mine-shaft-700 text-mine-shaft-100 px-3 py-1 rounded-full"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    className="p-1 font-bold text-cyan-/-aqua-500 gap-2"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    {" "}
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Location</label>
            <div className="flex items-center border border-gray-500 rounded-md">
              <FaLocationDot className="text-cyan-/-aqua-500 p-1" size={30} />
              <input
                type="text"
                name="location"
                value={jobDetails.location}
                onChange={handleChange}
                placeholder="Enter Job Type"
                className="w-full bg-mine-shaft-800 text-mine-shaft-100  p-3 focus:outline-none rounded-r-md"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Openings</label>
            <div className="flex items-center border border-gray-500 rounded-md">
              <FaUserAlt className="text-cyan-/-aqua-500 p-1" size={30} />
              <input
                type="text"
                name="applicants"
                value={jobDetails.applicants}
                onChange={handleChange}
                placeholder="Enter no. of openings"
                className="w-full bg-mine-shaft-800 text-mine-shaft-100  p-3 focus:outline-none rounded-r-md"
              />
            </div>
          </div>

          {/* Salary */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-2">Salary</label>
            <div className="flex items-center border border-gray-500 rounded-md">
              <FaRupeeSign className="text-cyan-/-aqua-500 p-1" size={30} />
              <input
                type="text"
                name="salary"
                value={jobDetails.salary}
                onChange={handleChange}
                placeholder="Enter Salary"
                className="w-full bg-mine-shaft-800 text-mine-shaft-100  p-3 focus:outline-none rounded-r-md"
              />
            </div>
          </div>

          {/* Job Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Job Description
            </label>
            <textarea
              name="description"
              value={jobDetails.description}
              onChange={handleChange}
              placeholder="Enter Job Description"
              className="w-full bg-mine-shaft-800 text-mine-shaft-100 p-3 border border-gray-500 rounded-md focus:outline-none"
              rows="4"
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Responsibilities
            </label>
            <textarea
              name="responsibilities"
              value={jobDetails.responsibilities}
              onChange={handleChange}
              placeholder="Enter Job Responsibilities"
              className="w-full bg-mine-shaft-800 text-mine-shaft-100 p-3 border border-gray-500 rounded-md focus:outline-none"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              onClick={()=>handlePostJob}
              className="bg-cyan-/-aqua-500 text-gray-800 p-3 rounded-md font-semibold hover:bg-cyan-/-aqua-600"
            >
             {job?"Update Job":"Post Job"}
            </button>
          </div>
        </form>
      </div>
      
   </>
  )
}

export default PostJob