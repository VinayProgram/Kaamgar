// lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/',
  withCredentials: true,
  // withCredentials: true, // Optional: useful if you handle cookies/sessions
});

export default api;

export const pathToserver = 'http://localhost/'