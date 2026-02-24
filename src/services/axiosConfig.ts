import axios from 'axios'; 
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse} from 'axios'; 
export interface ApiRequestConfig extends InternalAxiosRequestConfig {
  requiresAuth?: boolean;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://qbc11-front-next.liara.run/api',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config: ApiRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('⚠️ Unauthorized - redirecting to login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;