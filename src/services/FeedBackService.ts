import {toast} from "react-toastify";
import http from "./httpsClient";

const baseURL = "/feedback";

export async function createFeedback(formData: FormData) {
  try {
    const {data} = await http.post(baseURL + "/create", formData);
    if (data.flag) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to create feedback");
    return null;
  }
}

export async function deleteFeedback(feedbackId: number) {
  try {
    const {data} = await http.delete(baseURL + `/delete/${feedbackId}`);
    if (data.flag) {
      toast.success(data.message);
      return true;
    } else {
      toast.error(data.message);
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to delete feedback");
    return false;
  }
}

export async function getAllFeedbacks() {
  try {
    const {data} = await http.get(baseURL + "/getall");
    if (data.flag) {
      return data.data;
    } else {
      toast.error(data.message);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch feedbacks");
    return null;
  }
}
