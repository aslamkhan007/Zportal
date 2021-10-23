import axios from 'axios'
let token = localStorage.getItem("blissToken")
console.log("token==",token)

let axiosInstance= axios.create({
    baseURL:"http://localhost:5000",
    headers:{
        'Authorization': localStorage.getItem("blissToken") ? `Bearer ${localStorage.getItem("blissToken")}`:''
    } 
})
export default axiosInstance;  

