import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = "http://localhost:5257/api/category";

const http = axios.create({
  baseURL: baseURL,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function createCategory(formData: FormData) {
  try {
    const { data } = await http.post("/create", formData);
    if (data.flag) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error('Failed to create category');
    return false;
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    const { data } = await http.delete(`/delete`, { data: { categoryId } });
    if (data.flag) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error('Failed to delete category');
    return false;
  }
}

export async function getAllCategories() {
  try {
    const { data } = await http.get("/getall");
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error('Failed to fetch categories');
    return [];
  }
}

export async function getCategoryById(categoryId: string) {
  try {
    const { data } = await http.get(`/get?categoryId=${categoryId}`);
    return data.data;
  } catch (error) {
    console.error("Error:", error);
    toast.error('Failed to fetch category');
    return null;
  }
}

export async function updateCategory(categoryId: string, formData: FormData) {
  try {
    const { data } = await http.put(`/update?categotyId=${categoryId}`, formData);
    if (data.flag) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error('Failed to update category');
    return false;
  }
}
