import axios from "axios";
const API_URL="http://localhost:8080";
export const API=axios.create({
    baseURL:API_URL,
    responseType:"json"
})
export const apiRequest=async({url,data,method,jwtToken,params})=>{
    try {
        const token=jwtToken || localStorage.getItem("jwtToken");
        const res=await API(url,{
            method:method|| "GET",
            data:data,
            headers:{
                "Content-type":"application/json",
                Authorization:token?`Bearer ${token}`:undefined,
            },
            params:params || null
        })
        return res.data;
    } catch (error) {
        const err=error.response;
        console.log(err);
        return{ 
            status:err?.status || 500,
            message:err?.data?.message || "An Error Occured"
        };
        
    }
}