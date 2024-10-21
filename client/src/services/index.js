import axios from "axios";
const API_URL="http://localhost:8080";
export const API=axios.create({
    baseURL:API_URL,
    responseType:"json"
})
export const apiRequest=async({url,data,method,params})=>{
    try {
        const res=await API(url,{
            method:method|| "GET",
            data:data,
            params:params || null
        })
        return res.data;
    } catch (error) {
        const err=error.res;
        console.log(err);
        return{ status:err,message:err.message};
        
    }
}