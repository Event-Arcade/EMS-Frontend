import { toast } from "react-toastify";
import http from "./httpsClient";

const baseURL = "/chat";

export async function getChatMessages() {
  try {
    const response = await http.get(baseURL + `/getall`);
    if(response){
        return response.data;
    }else{
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch messages");
    return;
  }
}

export async function getChatMessageById(msgId: number) {
  try {
    const response = await http.get(baseURL + `/get/${msgId}`);
    if(response){
        return response.data;
    }else{
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to fetch messages");
    return;
  }
}

export async function sendNewMessage(formData: any) {
  try {
    const response = await http.post(baseURL + "/send", formData);
    if(response){
        return response.data;
    }else{
        return null;
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to create message");
    return;
  }
}

export async function getUnreadMessages() {
    try {
        const response = await http.get(baseURL + `/getunread`);
        if(response){
            return response.data;
        }else{
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch messages");
        return;
    }
}

export async function getChatUsers() {
    try {
        const response = await http.get(baseURL + `/get-my-chat-users`);
        if(response){
            return response.data;
        }else{
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch messages");
        return;
    }
}

