import { toast } from "react-toastify";
import http from "./httpsClient";

const baseURL = "/category";

export async function createCategory(formData: FormData) {
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
    toast.error("Failed to create category");
    return null;
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const { data } = await http.delete(baseURL + `/delete/${categoryId}`);
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

export async function getAllCategories() {
  try {
    const { data } = await http.get(baseURL + "/getall");
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch categories");
    return;
  }
}

export async function getCategoryById(categoryId: string) {
  try {
    const { data } = await http.get(`/get/${categoryId}`);
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch category");
    return;
  }
}

export async function updateCategory(categoryId: number, formData: FormData) {
  try {
    const { data } = await http.put(
      baseURL + `/update/${categoryId}`,
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
