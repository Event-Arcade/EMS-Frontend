import { User } from "../interfaces/User";
import http from "./httpsClient";
import { toast } from "react-toastify";

const apiEndpoint = "/account";

export async function login(formData: FormData) {
  const { data } = await http.post(apiEndpoint + "/login", formData);
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
    const response = await http.post(`${apiEndpoint}/register`, formData);
    if (response) {
      if (response.data.flag) {
        localStorage.setItem("token", response.data.data);
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error((error as any).response?.data.message);
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export async function getCurrentUserByToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const { data } = await http.get(apiEndpoint + "/getme");
    return data.data as User;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function update(formData: FormData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Not authorized. Please log in.");
      return false;
    }
    console.log(formData);
    const { data } = await http.put(apiEndpoint + "/updateaccount", formData);
    if (data.flag) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred while updating the profile.");
    return null;
  }
}

export async function getAccountById(id: string) {
  try {
    const response = await http.get(`${apiEndpoint}/getaccountbyid/${id}`);
    if (response) {
      if (response.data.flag) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getAccounts() {
  try {
    const { data } = await http.get(apiEndpoint);
    return data.data as User[];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function deleteAccount() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Not authorized. Please log in.");
      return false;
    }
    const { data } = await http.delete(apiEndpoint + "/delete");
    console.log(data);
    if (data.flag) {
      toast.success(data.message);
      // remove the token from local storage
      localStorage.removeItem("token");
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred while deleting the account.");
    return false;
  }
}
