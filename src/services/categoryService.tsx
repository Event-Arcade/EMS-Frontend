import { toast } from "react-toastify";
import http from "./httpsClient";

const baseURL = "/category";

export async function createCategory(formData: FormData) {
  try {
    const response = await http.post(baseURL + "/create", formData);
    if (response) {
      if (response.data.flag) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to create category");
    return null;
  }
}

export async function deleteCategory(categoryId: number) {
  try {
    const response = await http.delete(baseURL + `/delete/${categoryId}`);
    if (response) {
      if (response.data.flag) {
        toast.success(response.data.message);
        return categoryId;
      } else {
        toast.error(response.data.message);
        return null;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to delete category");
    return null;
  }
}

export async function getAllCategories() {
  try {
    const response = await http.get(baseURL + "/getall");
    if (response) {
      if (response.data.flag) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return [];
      }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to get all categories");
    return [];
  }
}

export async function getCategoryById(categoryId: number) {
  try {
    const response = await http.get(baseURL + `/getbyid/${categoryId}`);
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
    toast.error("Failed to get category by id");
    return null;
  }
}

export async function updateCategory(categoryId: number, formData: FormData) {
  try {
    const response = await http.put(
      baseURL + `/update/${categoryId}`,
      formData
    );
    if (response) {
      if (response.data.flag) {
        toast.success(response.data.message);
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return null;
      }
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to update category");
    return null;
  }
}
