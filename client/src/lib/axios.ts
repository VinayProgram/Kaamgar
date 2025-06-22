// lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  
//   withCredentials: true, // Optional: useful if you handle cookies/sessions
});

export default api;
