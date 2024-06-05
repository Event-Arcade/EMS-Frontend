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
    const response = await http.get(`${apiEndpoint}/get/${id}`);
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
    const { data } = await http.get(`${apiEndpoint}/getall`);
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

export async function updateToAdminAccount(id: string) {
  try {
    const data = new FormData();
    data.append("userId", id);
    const response = await http.post(`${apiEndpoint}/update-user-role`, data);
    if (response.status === 200) {
      toast.success("User role updated successfully.");
      return true;
    } else {
      toast.error("Failed to update user role.");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("An error occurred while updating the account.");
    return false;
  }
}

export async function updatePassword(data: FormData){
  try {
    const response = await http.put(`${apiEndpoint}/updatepassword`, data);
    if (response) {
      if (response.data.flag) {
        toast.success(response.data.message);
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
