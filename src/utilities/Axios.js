// utilities/axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://kartalucia-backend.vercel.app/api', // or use dynamic import if needed
  withCredentials: true, // ✅ Global setting to include credentials
});

export default axiosInstance;
