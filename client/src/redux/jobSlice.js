import { createSlice } from "@reduxjs/toolkit";

const initialState={
    allJobs:[],
    savedJobs:[],
    currentJob:null
};
const jobSlice=createSlice({
    name:"jobs",
    initialState,
    reducers:{
        setJobs(state,action){
            state.allJobs=action.payload;
        },
        setJobDetails(state,action){
            state.currentJob=action.payload;
        },
        saveJob(state,action){
            const jobToSave=action.payload;
            if(!state.savedJobs.find(job=>job.id===jobToSave.id)){
                state.savedJobs.push(jobToSave);
            }
        },
        removeSavedJobs(state,action){
            const jobToRemove=action.payload;
            state.savedJobs=state.savedJobs.filter(job=>job.id!=jobToRemove);
        }
    }
});
export const {setJobs,setJobDetails,saveJob,removeSavedJobs}=jobSlice.actions;
export default jobSlice.reducer;