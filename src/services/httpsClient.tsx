import axios from "axios";
const baseURL =
  "http://ec2-51-20-69-57.eu-north-1.compute.amazonaws.com:8080/api";

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
