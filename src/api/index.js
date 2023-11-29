import axios from "axios";
const axiosSecure = axios.create({
  // baseURL: import.meta.env.VITE_VERCEL_URL,
  baseURL: import.meta.env.VITE_VERCEL_URL2, //firebase deploy
  // baseURL: import.meta.env.VITE_LOCALHOST,
  withCredentials: true,
});

export default axiosSecure;
