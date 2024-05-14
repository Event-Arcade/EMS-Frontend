import axios from "axios";
const baseURL = "http://localhost:5257/api";

const HTTP = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor to add the token to the header
HTTP.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//export
export default HTTP;
