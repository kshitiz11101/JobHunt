import React, { useState } from 'react'
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaClock, FaSort } from 'react-icons/fa';

const SearchJobs = ({onSearch}) => {
   
  const [filters,setFilters]=useState({
    title: "",
    location: "",
    experience: "",
    jobType: "",
  });
  const handleInputChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
  const handleSearch = () => {
    onSearch(filters);
  };
  return (
    <div className='w-full bg-mine-shaft-950 font-["poppins"]'>
    {/* <Header/> */}
    <div className="text-white p-4">
    <div className="flex flex-wrap items-center gap-4 mb-6 w-full">
      <div className="flex items-center bg-mine-shaft-900 rounded-md p-2 flex-grow w-full md:w-auto">
        <FaSearch className="text-cyan-/-aqua-500 mr-2" />
        <input
          type="text"
          name='title'
          placeholder="Job Title"
          className="bg-transparent outline-none flex-grow w-full"
          value={filters.title}
          onChange={handleInputChange}
        />
        <FaSort className="text-gray-500 ml-2" />
      </div>
      <div className="flex items-center bg-mine-shaft-900 rounded-md p-2 flex-grow w-full md:w-auto">
        <FaMapMarkerAlt className="text-cyan-/-aqua-500 mr-2" />
    
        <input type="location"
         className='bg-transparent outline-none flex-grow w-full' 
          placeholder='Location'
          name='location'
          value={filters.location}
          onChange={handleInputChange} />
        <FaSort className="text-gray-500 ml-2" />
      </div>
      <div className="flex items-center bg-mine-shaft-900 rounded-md p-2 flex-grow w-full md:w-auto">
        <FaBriefcase className="text-cyan-/-aqua-500 mr-2" />
        <input type="text"
         className='bg-transparent outline-none flex-grow w-full' 
         name='experience'
         value={filters.experience}
         onChange={handleInputChange}
         placeholder='Experience' />
        <FaSort className="text-gray-500 ml-2" />
      </div>
      <div className="flex items-center bg-mine-shaft-900 rounded-md p-2 flex-grow w-full md:w-auto ">
        <FaClock className="text-cyan-/-aqua-500 mr-2" />
        <input type="text" 
        className='bg-transparent outline-none flex-grow w-full' 
         placeholder='Job Type'
         name='jobType'
         value={filters.jobType}
         onChange={handleInputChange}
         />
        <FaSort className="text-gray-500 ml-2" />
      </div>
      <button onClick={handleSearch} className="bg-cyan-/-aqua-500 text-white px-4 py-2 rounded-md hover:bg-cyan-/-aqua-600">
            Search
          </button>
    </div>
   
  </div>
      {/* <Footer/> */}
  </div>
  )
}

export default SearchJobs