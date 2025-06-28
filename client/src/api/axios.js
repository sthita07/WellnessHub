// api.js (or wherever you setup Axios)
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

// Add a request interceptor to send token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;