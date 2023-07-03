import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Create an instance of Axios with custom configurations
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://nickpiccaro-automatic-pancake-w5rwg9jj76qhv4qw-5000.preview.app.github.dev/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
    /** In dev, intercepts request and logs it into console for dev */

    return config;
}, (error: AxiosError) => {

    return Promise.reject(error);
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can modify or handle the response data here
    return response;
  },
  (error: AxiosError) => {
    // You can handle response errors here
    return Promise.reject(error);
  }
);

export default axiosInstance;