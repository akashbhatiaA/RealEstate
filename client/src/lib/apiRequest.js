import axios from "axios";

const apiRequest = axios.create({
    baseURL : "http://localhost:8800/api",
    withCredentials: true // eske help sa cookies store ho jayega
})

export default apiRequest;