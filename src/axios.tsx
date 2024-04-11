import axios from "axios";

const instance =  axios.create({baseURL: "http://localhost:5257",});

export default instance;
