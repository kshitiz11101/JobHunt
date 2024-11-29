import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { apiRequest } from '../services'
import { useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toast'
import { AiOutlineMail, AiOutlineTags } from 'react-icons/ai'
import { FaBuilding, FaLocationDot } from 'react-icons/fa6';
import { FaCalendarAlt, FaCommentAlt } from 'react-icons/fa'
import { GiSkills } from 'react-icons/gi'
import { MdDescription } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const userId = parseInt(useSelector((state) => state.userDetail.id), 10);
    const userName = useSelector((state) => state.userDetail.name);
    const email = useSelector((state) => state.userDetail.email);
    const token = useSelector((state) => state.jwtToken);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        email: email || 'N/A',
        jobTitle: 'N/A',
        company: 'N/A',
        location: 'N/A',
        about: 'N/A',
        skills: [],
        experiences: [
            {
                title: 'N/A',
                company: 'N/A',
                location: 'N/A',
                startDate: 'N/A',
                endDate: 'N/A',
                description: 'N/A'
            }
        ]
    });
    const [hasProfile, setHasProfile] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value,
        })
    }

    const handleExperienceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedExperiences = [...profileData.experiences || []];
        updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
        setProfileData({
            ...profileData,
            experiences: updatedExperiences,
        });
    }

    const addExperienceField = () => {
        setProfileData({
            ...profileData,
            experiences: [
                ...profileData.experiences,
                {
                    title: 'N/A',
                    company: 'N/A',
                    location: 'N/A',
                    startDate: 'N/A',
                    endDate: 'N/A',
                    description: 'N/A'
                }
            ]
        })
    }

    const addOrUpdateProfile = async (e) => {
        e.preventDefault();
        console.log('Sending request', profileData);
        try {
            const method = hasProfile ? "PUT" : "POST";
            const url = hasProfile ? `/profiles/updateProfile/${userId}` : `/profiles/addProfile/${userId}`;
            const res = await apiRequest({
                url,
                method,
                data: profileData,
                token,
            });
            // toast.success(hasProfile ? "Profile Updated Successfully" : "Profile Added Successfully");
            setProfileData(res.data);

            console.log('Profile operation successful', res);
            setIsEditing(false);
            setHasProfile(true);
            // Fetch the updated profile
            const updatedProfile = await apiRequest({
                url: `/profiles/${userId}`,
                method: "GET",
            });

            setProfileData(updatedProfile);
            console.log(updatedProfile);
            await fetchProfile();
        } catch (error) {
            toast.error("Error in profile operation");
            console.log(error);
        }
    }

    const fetchProfile = async () => {
        if (!userId) return;
        try {
            const res = await apiRequest({
                url: `/profiles/${userId}`,
                method: "GET",
            });

            // If no profile exists, set default values
            if (!res || Object.keys(res).length === 0) {
                setProfileData({
                    email: email || 'N/A',
                    jobTitle: 'N/A',
                    company: 'N/A',
                    location: 'N/A',
                    about: 'N/A',
                    skills: [],
                    experiences: [
                        {
                            title: 'N/A',
                            company: 'N/A',
                            location: 'N/A',
                            startDate: 'N/A',
                            endDate: 'N/A',
                            description: 'N/A'
                        }
                    ]
                });
                setHasProfile(false);
            } else {
                setProfileData(res);
                setHasProfile(true);
            }
        } catch (error) {
            console.log("Error fetching profile");
            setProfileData({
                email: email || 'N/A',
                jobTitle: 'N/A',
                company: 'N/A',
                location: 'N/A',
                about: 'N/A',
                skills: [],
                experiences: [
                    {
                        title: 'N/A',
                        company: 'N/A',
                        location: 'N/A',
                        startDate: 'N/A',
                        endDate: 'N/A',
                        description: 'N/A'
                    }
                ]
            });
            setHasProfile(false);
        }
    };

    useEffect(() => {
       
        if (userId && profileData !== null) {
            fetchProfile();
        }
    }, [userId]);

    return (
        <>
            <ToastContainer />
            <Header />
            <div className="min-h-screen  bg-mine-shaft-800 text-white p-8 mx-auto grid grid-cols-2 md:grid-cols-1 gap-6">
                {profileData ? (
                    isEditing ? (
                        <form onSubmit={addOrUpdateProfile} >
                            <button onClick={() => navigate(-1)} className="text-lg self-start mb-2 bg-none border border-cyan-/-aqua-500 hover:bg-cyan-/-aqua-500 text-mine-shaft-100 rounded-md px-6 py-2 hover:text-mine-shaft-900 ">Back</button>

                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Email</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <AiOutlineMail className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div >
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Job Title</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <AiOutlineTags className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="text"
                                        name="jobTitle"
                                        value={profileData.jobTitle}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Company</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <FaBuilding className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="text"
                                        name="company"
                                        value={profileData.company}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Location</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <FaLocationDot className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="text"
                                        name="location"
                                        value={profileData.location}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>About</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <FaCommentAlt className="text-cyan-500 p-1" size={30} />
                                    <textarea
                                        name="about"
                                        value={profileData.about}
                                        onChange={handleInputChange}
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <label className='block text-sm font-medium mb-2 '>Skills</label>
                                <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                    <GiSkills className="text-cyan-500 p-1" size={30} />
                                    <input
                                        type="text"
                                        name="skills"
                                        value={profileData.skills}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, skills: e.target.value.split(',') })
                                        }
                                        className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                    />
                                </div>
                            </div>
                            <div className='w-full'>
                                <h3 className="text-xl font-semibold mt-2 ">Experiences</h3>
                               
                                {profileData.experiences.map((exp, index) => (
                                    <div key={index} className="mt-2 border border-cyan-/-aqua-500 rounded-lg p-4 space-y-4">
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <AiOutlineTags className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="text"
                                                name="title"
                                                value={exp.title}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Title"
                                                className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <FaBuilding className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="text"
                                                name="company"
                                                value={exp.company}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Company"
                                                className="w-full  bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <FaLocationDot className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="text"
                                                name="location"
                                                value={exp.location}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Location"
                                                className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <FaCalendarAlt className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={exp.startDate}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                className="w-full  bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <FaCalendarAlt className="text-cyan-500 p-1" size={30} />
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={exp.endDate}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>
                                        <div className='flex items-center border border-mine-shaft-500 rounded-md'>
                                            <MdDescription className="text-cyan-500 p-1" size={30} />
                                            <textarea
                                                name="description"
                                                value={exp.description}
                                                onChange={(e) => handleExperienceChange(index, e)}
                                                placeholder="Description"
                                                className="w-full bg-mine-shaft-800 text-white p-3 focus:outline-none rounded-r-md"
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={addExperienceField}
                                            className="font-semibolc bg-cyan-/-aqua-500 hover:bg-cyan-/-aqua-600 text-mine-shaft-900 font-semibold py-2 px-4 rounded-md"
                                        >
                                            Add More Experiences
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="submit"
                                onClick={fetchProfile}
                                className="bg-cyan-/-aqua-500 hover:bg-cyan-/-aqua-700 text-black font-medium py-2 px-4 rounded text-sm mt-4"
                                >
                                {hasProfile ? 'Update Profile' : 'Save Profile'}
                            </button>
                        </form>
                    ) : (
                        <>
                            <div className="relative">
                                <img 
                                    src="background.jpg" 
                                    alt="Sunset background" 
                                    className="w-full h-48 object-center rounded-lg" 
                                    onError={(e) => e.target.src = '/default-background.jpg'}
                                />
                                <div className="absolute bottom-0 left-4 transform translate-y-1/2">
                                    <img 
                                        src="/Avatars/Avatar1.jpg" 
                                        alt="Profile" 
                                        className="w-32 h-32 rounded-full border-4 border-gray-900"
                                        onError={(e) => e.target.src = '/default-avatar.jpg'}
                                    />
                                </div>
                            </div>
                            <div className="mt-12 flex justify-between items-center">
                                <div>
                                    <h1 className="text-3xl font-bold">{userName || 'N/A'}</h1>
                                    <p className="text-xl text-mine-shaft-200">{profileData?.jobTitle || 'N/A'}</p>
                                    <p className="text-lg text-mine-shaft-200"> 
                                        <span className='font-semibold text-xl text-cyan-/-aqua-500'>
                                            {profileData?.company || 'N/A'}
                                        </span> • {profileData?.location || 'N/A'}
                                    </p>
                                    
                                    <p className="text-lg text-cyan-/-aqua-500 cursor-pointer hover:text-cyan-/-aqua-600">
                                        {profileData?.email || 'N/A'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-cyan-/-aqua-500 hover:bg-cyan-/-aqua-700 text-black font-semibold py-2 px-4 rounded"
                                >
                                    Edit Profile
                                </button>
                            </div>
                            <div className="mt-2">
                                <h2 className="text-2xl font-semibold mb-2">About</h2>
                                <p className="text-xl text-gray-300">{profileData?.about || 'No information available'}</p>
                            </div>
                            <div className="mt-2">
                                <h2 className="text-2xl font-semibold mb-2">Skills</h2>
                                <div className='flex flex-wrap gap-2'>
                                    {profileData?.skills?.length > 0 ? (
                                        profileData.skills.map((skill, index) => (
                                            <div 
                                                key={index} 
                                                className="bg-mine-shaft-700 px-2 py-1 rounded text-cyan-/-aqua-500"
                                            >
                                                {skill || 'N/A'}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No skills available</p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-2">
                                <h2 className="text-2xl font-semibold mb-2">Experiences</h2>
                                {profileData?.experiences?.length > 0 ? (
                                    profileData.experiences.map((exp, index) => (
                                        <div key={index} className="mb-6 flex items-start space-x-4">
                                            <div className='w-12 h-12 bg-mine-shaft-700 rounded-md flex items-center justify-center'>
                                                <img 
                                                    src={`/companies/${exp.company}.png`} 
                                                    alt={exp.company?.charAt(0) || 'N/A'} 
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.src = '/default-company.png';
                                                    }}
                                                />
                                            </div>
                                            <div className='flex-1'>
                                                <h3 className="text-2xl font-semibold text-cyan-/-aqua-500">
                                                    {exp.title || 'N/A'}
                                                </h3>
                                                <p className="text-xl text-gray-300">
                                                    <span className="font-medium">{exp.company || 'N/A'}</span> 
                                                    &middot; {exp.location || 'N/A'}
                                                </p>
                                                <p className="text-md text-mine-shaft-200">
                                                    {exp.startDate || 'N/A'} - {exp.endDate || 'Present'}
                                                </p>
                                                <p className="mt-2 text-lg text-mine-shaft-100">
                                                    {exp.description || 'No description provided'}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No experiences added yet</p>
                                )}
                            </div>
                        </>
                    )
                ) : (
                    <p className="text-white text-center text-xl">Loading profile...</p>
                )}
            </div>
            <Footer />
        </>
    )
}

export default UserProfile