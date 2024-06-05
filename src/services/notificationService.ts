import { toast } from "react-toastify";
import http from "./httpsClient";

const baseURL = "/notification";

export async function getUnreadedNotifications() {
  try {
    const response = await http.get(baseURL + "/unread");
    if(response){
        return response.data;
    }else{
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch notifications");
    return;
  }
}

export async function setNotificationMarkAsRead(id: number) {
  try {
    const response = await http.put(baseURL + "/mark-as-read/"+id);
    if(response.status === 200){
        return true;
    }else{
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to mark notification as read");
    return null;
  }
}