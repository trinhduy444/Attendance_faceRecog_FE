import axios from "axios";

export const BASE_URL = 'http://localhost:5000/api/v1';


const axiosConfig = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default axiosConfig;
