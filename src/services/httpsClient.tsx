import axios from "axios";
const baseURL =
  "http://localhost:5257/api/";

const http = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor to add the token to the header
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//export
export default http;
