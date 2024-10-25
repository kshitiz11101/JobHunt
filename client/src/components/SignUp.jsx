import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { apiRequest } from '../services';
import { toast, ToastContainer } from 'react-toast';
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    accountType: ''
  });

  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!formData.name){
      toast.error('Please enter your name');
      return;
    }
    if(!formData.email){
      toast.error("Email is Required!");
      return;
    }
    if(!formData.accountType){
      toast.error("Please select a role");
      return;
    }
    if(!formData.password){
      toast.error("Password is Required");
      return;
    }
    if(formData.password.length<6){
      toast.error("Password must be at least 6 characters long");
      return;
    }

    console.log('Sending request', formData);
    try {
      const res=await apiRequest({
        url:"/users/register",
        method:"POST",
        data:formData,
      })
      console.log("Response:",res);
      navigate("/login");
      toast.success("Register Successful");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };
  return (
    <>
    <ToastContainer
    position='top-right'
    />
    <div className='w-1/2 mx-auto flex flex-col justify-center'>
      <div className='text-2xl font-semibold text-mine-shaft-20 text-mine-shaft-200'>
        Create Account
      </div>

      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Select Role <span className="text-red-500">*</span></label>
          <div className="flex justify-center sm:justify-start">
            <label className={`flex items-center text-gray-300 mr-2 p-3 rounded-md ${formData.accountType === 'APPLICANT' ? 'border-2 border-cyan-500' : 'border border-cyan-/-aqua-500'}`}>
              
              <input
                type="radio"
                name="accountType" 
                value="APPLICANT" 
                onChange={handleChange}
                className="mr-2 rounded-md border border-cyan-/-aqua-500"
                checked={formData.accountType === 'APPLICANT'}
              />
              Applicant
            </label>
            <label className={`flex items-center text-gray-300 p-3 rounded-md ${formData.accountType === 'EMPLOYER' ? 'border-2 border-cyan-500' : 'border border-cyan-/-aqua-500'}`}>
              <input
                type="radio"
                name="accountType" 
                value="EMPLOYER" 
                onChange={handleChange}
                className="mr-2 border border-cyan-/-aqua-500"
                checked={formData.accountType === 'EMPLOYER'}
              />
              Employer
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
        
          <input
            type="text"
            id="name"
            name="name"
            className="w-80 p-2 border border-mine-shaft-500 rounded bg-mine-shaft-700 text-white focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
  
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-80 p-2 border border-mine-shaft-500 rounded bg-mine-shaft-700 text-white focus:outline-none"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-80 p-2 border border-mine-shaft-500 rounded bg-mine-shaft-700 text-white focus:outline-none"
            value={formData.password}
            onChange={handleChange}
                   />
        </div>
        <button type="submit" className='w-80 bg-cyan-/-aqua-500 font-bold py-2 px-4 rounded hover:bg-cyan-/-aqua-600 transition duration-300'>
          Sign Up
        </button>

        <p className='text-mine-shaft-200'>
          Already Registered?{' '}
          <Link to="/login"className='text-cyan-/-aqua-500 hover:underline cursor-pointer' >
          Login 
          </Link>   
        </p>
      </form>
    </div>
    </>
  );
};
export default SignUp;
