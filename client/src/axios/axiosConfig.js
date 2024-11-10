import axios from "axios";
const port = import.meta.env.VITE_PORT;

const axiosInstance = axios.create({
  // baseURL: `http://localhost:${port}/api`,
  baseURL: `https://evangadi-forum-backend-20-qqbn.onrender.com/api`,
});

export default axiosInstance;
