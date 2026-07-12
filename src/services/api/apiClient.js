import axios from 'axios';
import { WAQI_BASE_URL, OWM_BASE_URL } from '@/utils/constants';

// World Air Quality Index API instance
export const waqiClient = axios.create({
  baseURL: WAQI_BASE_URL,
  timeout: 10000,
});

waqiClient.interceptors.request.use(
  (config) => {
    // Automatically append token to every request
    config.params = {
      ...config.params,
      token: import.meta.env.VITE_WAQI_TOKEN
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// OpenWeatherMap API instance
export const owmClient = axios.create({
  baseURL: OWM_BASE_URL,
  timeout: 10000,
});

owmClient.interceptors.request.use(
  (config) => {
    // Automatically append API key to every request
    config.params = {
      ...config.params,
      appid: import.meta.env.VITE_OWM_API_KEY
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// Global response interceptor for error handling
const responseInterceptor = (response) => response;
const errorInterceptor = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.status, error.response.data);
    if (error.response.status === 401) {
      console.error('Unauthorized: Check your API keys in .env.local');
    } else if (error.response.status === 429) {
      console.error('Rate Limit Exceeded: You have hit the API quota limit');
    }
  } else if (error.request) {
    console.error('Network Error: No response received');
  } else {
    console.error('Error setting up request:', error.message);
  }
  return Promise.reject(error);
};

waqiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
owmClient.interceptors.response.use(responseInterceptor, errorInterceptor);
