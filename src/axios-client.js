import axios from "axios";



const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true
})

axiosClient.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else if (['put', 'patch', 'delete'].includes(config.method) && config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    delete config.headers['Content-Type'];
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error;
  if(!response.status){
    alert('اینترنت شما قطع میباشد')
    return
  }
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    if(window.location.pathname != '/auth'){
        window.location.href= '/auth';
    }
    
  } else if (response.status === 404) {
    //Show not found
  }else if (response.status === 403) {
    localStorage.removeItem('ACCESS_TOKEN')
    window.location.href= '/login';
  }

  throw error;
})

export default axiosClient