
import { toast } from "react-toastify";
import http from "./httpsClient";

const baseURL = "/shopservices";

export async function createShop(formData: FormData) {
  try {
    const { data } = await http.post(baseURL + "/createmyshop", formData);
    if (data.flag) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to create category");
    return null;
  }
}

export async function deleteShop(shopId: string) {
  try {
    const { data } = await http.delete(baseURL + `/deletemyshop/${shopId}`);
    if (data.flag) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to delete category");
    return false;
  }
}

export async function getAllShops() {
  try {
    const { data } = await http.get(baseURL + "/allshops");
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

export async function updateShop(shopId: string, formData: FormData) {
  try {
    const { data } = await http.put(baseURL+
      `/update?categotyId=${shopId}`,
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
