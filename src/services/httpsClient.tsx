import axios from "axios";
import { toast } from "react-toastify";
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

HTTP.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error("Unauthorized");
      } else if (error.response.status === 403) {
        toast.error("Forbidden");
      } else if (error.response.status === 404) {
        toast.error("Not Found");
      } else if (error.response.status === 500) {
        toast.error("Internal Server Error");
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Something went wrong");
    }
    return Promise.reject(error);
  }
);

//export
export default HTTP;
