
import { toast } from "react-toastify";
import http from "./httpsClient";

const baseURL = "/shop";
export async function createShop(formData: FormData) {
  try {
    const response = await http.post(baseURL + "/create", formData);
    if(response){
      if(response.data.flag){
        toast.success(response.data.message);
        // replace the new token
        localStorage.setItem("token", response.data.data1);
        return response.data.data2;
      }
      else{
        toast.error(response.data.message);
        return null;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error((error as any).response?.data.message);
    return null;
  }
}

export async function deleteShop(shopId: number) {
  try {
    const response = await http.delete(baseURL + `/delete/${shopId}`);
    if(response){
      if(response.data.flag){
        toast.success(response.data.message);
        // replace the new token
        localStorage.setItem("token", response.data.data);
        return true;
      }else{
        toast.error(response.data.message);
        return false;}
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error((error as any).response?.data.message);
    return false;
  }
}

export async function getAllShops() {
  try {
    const { data } = await http.get(baseURL + "/getall");
    if(data.flag){
        return data.data;
        }
        else{
            toast.error(data.message);
            return null;
        }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch categories");
    return;
  }
}

export async function getMyShop() {
  try {
    const { data } = await http.get(baseURL + "/myshop");
    if(data.flag){
        return data.data;
        }
        else{
            toast.error(data.message);
            return null;
        }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch category");
    return null;
  }
}

export async function updateShop(shopId: number, formData: FormData) {
  try {
    const { data } = await http.put(baseURL+
      `/update/${shopId}`,
      formData
    );
    if (data.flag) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to update category");
    return null;
  }
}

export async function getShopById(shopId: number) {
  try {
    const { data } = await http.get(baseURL+`/get/${shopId}`);
    if (data.flag) {
      return data.data;
    }
    else{
        toast.error(data.message);
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch category");
    return null;
  }
}

