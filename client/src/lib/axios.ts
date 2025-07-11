// lib/axios.ts
import axios from 'axios';
export const pathToserver = 'http://localhost/'
const api = axios.create({
  baseURL: pathToserver,
  withCredentials: true,
  // withCredentials: true, // Optional: useful if you handle cookies/sessions
});

export default api;

