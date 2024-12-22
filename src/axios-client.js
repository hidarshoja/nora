import axios from "axios";
import { refreshToken } from "./utils/auth";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  withCredentials: true, // Enable sending cookies with requests
});

let refreshPromise = null;

// axiosClient.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;
// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			try {
// 				// If a refresh is already in progress, wait for it to complete
// 				if (refreshPromise) {
// 					await refreshPromise;
// 					return axios(originalRequest);
// 				}

// 				// Start a new refresh process
// 				refreshPromise = refreshToken();
// 				await refreshPromise;
// 				refreshPromise = null;

// 				return axios(originalRequest);
// 			} catch (refreshError) {
// 				// If refresh fails, redirect to login or handle as needed
// 				useUserStore.getState().logout();
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );

export default axiosClient;
