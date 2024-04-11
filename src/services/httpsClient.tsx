import axios from "axios";
import {toast} from "react-toastify";

//axios interceptor
axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if(!expectedError){
        console.log("Logging the error", error);
        toast.error("An unexpected error occurred.");
    }
    return Promise.reject(error);
});

axios.defaults.baseURL = "http://localhost:5257/api";

//export
export default axios;