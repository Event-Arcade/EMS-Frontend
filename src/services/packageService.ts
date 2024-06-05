import { toast } from "react-toastify";
import http from "./httpsClient";

const baseURL = "/package";

export async function createPackage(formData: any) {
  try {
    const response = await http.post(baseURL + "/create", formData);
    if(response){
      console.log(response);
        if(response.data.flag){
            toast.success(response.data.message);
            return response.data.data;}
        else{
            toast.error(response.data.message);
            return null;
        }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to create package");
    return null;
  }
}

export async function deletePackage(packageId: number) {
  try {
    const response = await http.delete(baseURL + `/delete/${packageId}`);
    if(response){
        if(response.data.flag){
            toast.success(response.data.message);
            return true;}
        else{
            toast.error(response.data.message);
            return false;
        }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to delete package");
    return false;
  }
}

export async function getAllPackages() {
  try {
    const response = await http.get(baseURL + "/getall");
    return response.data.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch packages");
    return;
  }
}

export async function updateSubPackage(id: number, data: FormData){
  try {
    const response = await http.put(baseURL + `/update-sub-package/${id}`, data);
    if(response){
        if(response.data.flag){
            toast.success(response.data.message);
            return response.data.data;
          }
        else{
            toast.error(response.data.message);
            return null;
        }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to update package");
    return null;
  }
}

export async function getAllSubPackages(){
  try {
    const response = await http.get(baseURL + "/get-sub-packages");
    if(response){
        if(response.data.flag){
            return response.data.data;
          }
        else{
            toast.error(response.data.message);
            return null;
        }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch sub packages");
    return null;
  }
}

export async function getSubPackageById(id: number){
  try {
    const response = await http.get(baseURL + `/get-sub-package-by-id/${id}`);
    if(response){
        if(response.data.flag){
            return response.data.data;
          }
        else{
            toast.error(response.data.message);
            return null;
        }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch sub package");
    return null;
  }
}

export async function getPackageById(id: number){
  try {
    const response = await http.get(baseURL + `/get/${id}`);
    if(response){
        if(response.data.flag){
            return response.data.data;
          }
        else{
            toast.error(response.data.message);
            return null;
        }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch package");
    return null;
  }
}

