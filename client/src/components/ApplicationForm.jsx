import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { apiRequest } from '../services';
import { FaUserAlt, FaPhoneAlt, FaLinkedin } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineFileText, AiOutlineLink } from 'react-icons/ai';
import { MdOutlineDescription } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toast';
import Header from './Header';
import Footer from './Footer';
import ConfirmBox from './ConfirmBox';
import { useNavigate } from 'react-router-dom';
const ApplicationForm = () => {
    const user=useSelector((state)=>state.userDetail);
    const currentJob=useSelector((state)=>state.jobs.currentJob);
    const [isBoxOpen,setIsBoxOpen]=useState(false);
    const navigate=useNavigate();
    const [applicantDetails,setApplicantDetails]=useState({
        email:user.email,
        name:user.name,
        phone:'',
        resume:'',
        portfolio:'',
        linkedIn:'',
        coverLetter:''
    });
    const handleChange = (e) => {
        setApplicantDetails({ ...applicantDetails, [e.target.name]: e.target.value });
    };
 
    
    const handleSubmitApplication = async(e) => {
        e.preventDefault();
        if(applicantDetails.phone.length<10){
            toast.error('Phone number should be 10 digits long');
        }
        if(!applicantDetails.portfolio){
            toast.error('Portfolio link is required');
        }
        if(!applicantDetails.resume){
            toast.error("Resume Link is required");
        }
        if(!applicantDetails.linkedIn){
            toast.error("LinkedIn Profile is required");
        }

      console.log("Sending Application",applicantDetails);
        try {
        const res=await apiRequest({
            url:`/applicant/applyJob/${currentJob.id}`,
            method:"POST",
            data:applicantDetails

        });
        console.log("Application Submitted Successfully:", applicantDetails);
        toast.success("Application Submitted Successfully")
        setApplicantDetails(res);
        
        
      } catch (error) {
        console.log("Error in application",error);
        toast.error("Error in application")
      }
      finally {
        setIsBoxOpen(false); 
    }
    };
    const openConfirmBox=(e)=>{
        e.preventDefault();
            setIsBoxOpen(true);
      }
      const closeConfirmBox=()=>{
        setIsBoxOpen(false);
      }
  return (
    <>
    <ToastContainer/>
    {/* <Header/> */}
    <div className="bg-mine-shaft-900 p-8 min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-4">
                Apply for {currentJob?.jobTitle} at {currentJob?.company}
            </h2>
            <button onClick={()=>navigate(-1)} className="text-lg self-start mb-2 bg-none border border-cyan-/-aqua-500 hover:bg-cyan-/-aqua-500 text-mine-shaft-100 rounded-md px-6 py-2 hover:text-mine-shaft-900 ">Back</button>
            <form onSubmit={openConfirmBox} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full">
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <div className="flex items-center border border-mine-shaft-500 rounded-md">
                        <FaUserAlt className="text-cyan-500 p-1" size={30} />
                        <input
                            type="text"
                            name="name"
                            value={applicantDetails.name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                            required
                        />
                    </div>
                </div>

                
                <div className="w-full">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="flex items-center border border-mine-shaft-500 rounded-md">
                        <AiOutlineMail className="text-cyan-500 p-1" size={30} />
                        <input
                            type="email"
                            name="email"
                            value={applicantDetails.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                            required
                        />
                    </div>
                </div>

                
                <div className="w-full">
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <div className="flex items-center border border-mine-shaft-500 rounded-md">
                        <FaPhoneAlt className="text-cyan-500 p-1" size={30} />
                        <input
                            type="text"
                            name="phone"
                            value={applicantDetails.phone}
                            onChange={handleChange}
                            placeholder="Enter Phone Number"
                            className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                            
                        />
                    </div>
                </div>

                
                <div className="w-full">
                    <label className="block text-sm font-medium mb-2">Portfolio</label>
                    <div className="flex items-center border border-mine-shaft-500 rounded-md">
                        <AiOutlineLink className="text-cyan-500 p-1" size={30} />
                        <input
                            type="url"
                            name="portfolio"
                            value={applicantDetails.portfolio}
                            onChange={handleChange}
                            placeholder="Portfolio or Personal Website"
                            className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                            
                        />
                    </div>
                </div>

                
                <div className="w-full">
                    <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
                    <div className="flex items-center border border-mine-shaft-500 rounded-md">
                        <FaLinkedin className="text-cyan-500 p-1" size={30} />
                        <input
                            type="url"
                            name="linkedIn"
                            value={applicantDetails.linkedIn}
                            onChange={handleChange}
                            placeholder="LinkedIn Profile"
                            className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                        />
                    </div>
                </div>

                <div className="w-full">
                    <label className="block text-sm font-medium mb-2">Resume</label>
                    <div className="flex items-center border border-mine-shaft-500 rounded-md">
                        <AiOutlineFileText className="text-cyan-500 p-1" size={30} />
                        <input
                            type="text"
                            name="resume"
                            value={applicantDetails.resume}
                            onChange={handleChange}
                            placeholder="Link to Resume"
                            className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                           
                        />
                    </div>
                </div>

                
                <div className="w-full">
                    <label className="block text-sm font-medium mb-2">Cover Letter</label>
                    <div className="flex items-center border border-mine-shaft-500 rounded-md">
                        <MdOutlineDescription className="text-cyan-500 p-1" size={30} />
                       <textarea 
                            id=""
                            type="text"
                            name="coverLetter"
                            value={applicantDetails.coverLetter}
                            onChange={handleChange}
                            placeholder="Cover Letter"
                            className="w-full bg-mine-shaft-800 text-mine-shaft-100 p-3 rounded-md focus:outline-none"
                            >
                            </textarea>
                    </div>
                </div>

                
                <div className="w-full md:col-span-2">
                    <button
                        type="submit"
                        className="bg-cyan-/-aqua-600 hover:bg-cyan-/-aqua-700 text-white p-3 rounded-md"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
        <ConfirmBox
        isOpen={isBoxOpen}
        onClose={closeConfirmBox}
        message="Are you sure you want to submit your application?"
        confirmText='Submit'
        cancelText='Cancel'
        onConfirm={handleSubmitApplication}
        />
       {/* <Footer/> */}
        </>
  )
}

export default ApplicationForm
