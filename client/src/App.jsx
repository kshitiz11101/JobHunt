import { BrowserRouter, Route } from "react-router-dom"
import Home from "./pages/Home"
import {Routes } from 'react-router-dom';
import FindJobs from "./pages/FindJobs";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SavedJobs from "./components/SavedJobs";
import JobDetails from "./components/JobDetails";
import PostJob from "./pages/PostJobPage";
import ApplicationForm from "./components/ApplicationForm";
import PostedJobsPage from "./pages/PostedJobsPage";
import UserProfilePage from "./pages/UserProfilePage";
import ApplicantsPage from "./pages/ApplicantsPage";
import AboutPage from "./pages/AboutPage";

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="*" element={<Home/>}/>
    <Route path="/user-profile" element={<UserProfilePage/>}/>
    <Route path="/find-jobs" element={<FindJobs/>}/>
    <Route path="job-detail" element={<JobDetails/>}/>
    <Route path="/saved-jobs" element={<SavedJobs/>}/>
    <Route path="/post-jobs" element={<PostJob/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/apply-jobs/:jobId" element={<ApplicationForm/>}/>
    <Route path="/signup" element={<SignUpPage/>} />
    <Route path="/posted-jobs" element={<PostedJobsPage/>}/>
    <Route path="applicants/:jobId" element={<ApplicantsPage/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    </Routes> 
    </BrowserRouter>

    </>
  )
}

export default App
