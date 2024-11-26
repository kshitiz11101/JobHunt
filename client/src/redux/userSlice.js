import { createSlice } from "@reduxjs/toolkit";
const storedUser=localStorage.getItem("userDetail")? JSON.parse(localStorage.getItem("userDetail")): null;
const storedToken=localStorage.getItem("jwtToken") || null;
const userSlice = createSlice({
    name: 'userDetail',
    initialState:{
        id:storedUser?.id ||  null,
        accountType:storedUser?.accountType || null,
        email:storedUser?.email || null,
        name:storedUser?.name || null,
        jwtToken:storedToken || null
       
    },
    reducers: {
        login(state, action) {
            // console.log("Login payload",action.payload);
            
            state.id = action.payload?.id;
            state.accountType = action.payload?.accountType;
            state.email=action.payload?.email;
            state.name=action.payload?.name;
            state.jwtToken=action.payload?.jwtToken;
            localStorage.setItem("userDetail", JSON.stringify({
                id: state.id,
                accountType: state.accountType,
                email: state.email,
                name: state.name,
              
              }));
              localStorage.setItem("jwtToken",state.jwtToken);
        },
        logout(state) {
            state.id = null;
            state.accountType=null;
            state.email=null;
            state.name=null;
           state.jwtToken=null;
            localStorage.removeItem("userDetail");
            localStorage.removeItem("jwtToken");
        },
        updateProfile(state,action){
           
      localStorage.setItem("userDetail", JSON.stringify({
        id: state.id,
        accountType: state.accountType,
        email: state.email,
        name: state.name,
     
      }));
        }
    }
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;