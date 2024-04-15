import http from "./httpsClient";
import { toast } from "react-toastify";

const apiEndpoint = "/Account";

export async function login(email: string, password: string) {
  const { data } = await http.post(apiEndpoint + "/login", {
    email: email,
    password: password,
  });
  console.log(data);
  if (data.flag) {
    localStorage.setItem("token", data.data);

    //set toast message
    toast.success(data.message);
    return true;
  } else {
    //set toast message
    toast.error(data.message);
    return false;
  }
}

export async function register(formData: FormData) {
  console.log(formData);
  try {
    const { data } = await http.post(`${apiEndpoint}/register`, formData);
    console.log(data);
    if (data.flag) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export async function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const { data } = await http.get(apiEndpoint + "/getme");

    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
