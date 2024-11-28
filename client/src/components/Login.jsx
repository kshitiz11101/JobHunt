import React ,{useState} from 'react'
import {toast,ToastContainer} from 'react-toast';
import { apiRequest } from '../services';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { login } from '../redux/userSlice';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    
  }); 
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleLogin=async(e)=>{
    e.preventDefault();
    if(!formData.email){
      toast.error("Email is Required!");
      return;
    }
    
    if(!formData.password){
      toast.error("Password is Required");
      return;
    }

    console.log('Sending request', formData);
    try {
      const res=await apiRequest({
        url:"/users/login",
        method:"POST",
        data:formData,
      })
      if(res && res.jwtToken && res.id){
        localStorage.setItem("jwtToken",res.jwtToken);
        
        dispatch(login({
          id: res.id,
          accountType: res.accountType,
          email: res.email,
          name: res.name,
          jwtToken:res.jwtToken
          
        }));
        navigate('/user-profile');
        toast.success("You have logged in successfully!")
      }
      else{
        toast.error("Login failed! Incorrect Email,Password or Role Chosen!");
      }
     
    } 
    catch (error) { 
      toast.error("Error in login");
      console.log(error);
    }
      }
  return (
    <>
  <ToastContainer
   position='top-right'
   />
    <div className='w-1/2 mx-auto flex flex-col justify-center'>
    <div className='text-2xl font-semibold text-mine-shaft-20 text-mine-shaft-200'>
      Login Account
    </div>

    <form onSubmit={handleLogin}>
    
     
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-300 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <div className='flex items-center'>
          
        <input
          type="email"
          id="email"
          name="email"
          className="w-80 p-2 border border-mine-shaft-500 rounded bg-mine-shaft-700 text-white focus:outline-none"
          value={formData.email}
          onChange={handleChange}
          // required
        /> 
        </div>
       
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
          // required
        />

       
      </div>
      <button type="submit" className='w-80 bg-cyan-/-aqua-500 font-bold py-2 px-4 rounded hover:bg-cyan-/-aqua-600 transition duration-300'>
        Login
      </button>

      <p className='text-mine-shaft-200'>
        Don't have an Account?{' '}
        <a href="/signup" className='text-cyan-/-aqua-500 hover:underline cursor-pointer'> Signup</a>
      </p>
    </form>
  </div>
  </>
  )
}
export default Login
