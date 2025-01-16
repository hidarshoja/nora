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
      // در صورت دریافت خطای 401 توکن را پاک کرده و به صفحه ورود هدایت کنیم
      localStorage.removeItem('ACCESS_TOKEN');
      window.location.href = '/auth/login'; // می‌توانید از useNavigate برای هدایت استفاده کنید
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
