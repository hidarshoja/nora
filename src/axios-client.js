import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  
  return config;
})

axiosClient.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.includes('admin/dashboard') || window.location.pathname.includes('user/home')) {
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = '/auth/login'
      }
      
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
