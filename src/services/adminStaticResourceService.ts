import { toast } from "react-toastify";
import http from "./httpsClient";

const baseURL = "/adminstaticresource";

export async function createAdminStaticResource(formData: FormData) {
  try {
    const { data } = await http.post(baseURL + "/create", formData);
    if (data.flag) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to create static resource");
    return null;
  }
}

export async function deleteAdminStaticResource(staticResourceId: number) {
  try {
    const { data } = await http.delete(baseURL + `/delete/${staticResourceId}`);
    if (data.flag) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to delete static resource");
    return false;
  }
}

export async function getAllAdminStaticResources() {
  try {
    const { data } = await http.get(baseURL + "/getall");
    if (data.flag) {
      return data.data;
    }
    else{
        toast.error(data.message);
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch static resources");
    return null;
  }
}

export async function getAdminStaticResourceById(staticResourceId: number) {
  try {
    const { data } = await http.get(baseURL+`/get/${staticResourceId}`);
    if (data.flag) {
      return data.data;
    }
    else{
        toast.error(data.message);
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch static resource");
    return null;
  }
}

export async function updateAdminStaticResource(staticResourceId: number, formData: FormData) {
  try {
    const { data } = await http.put(baseURL + `/update/${staticResourceId}`, formData);
    if (data.flag) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to update static resource");
    return null;
  }
}

