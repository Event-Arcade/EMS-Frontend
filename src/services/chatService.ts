import { toast } from "react-toastify";
import http from "./httpsClient";

const baseURL = "/chat";

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

export async function getChatUsers() {
    try {
        const response = await http.get(baseURL + `/get-my-chats`);
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

export async function getChatUser(id : string) {
    try {
        const response = await http.get(baseURL + `/get-my-chat/${id}`);
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

export async function getChatUserInbox(id : string) {
    try {
        const response = await http.get(baseURL + `/get-chat-history/${id}`);
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

export async function setChatAsReaded(id: string) {
    try {
        const response = await http.post(baseURL + `/set-message-read/${id}`);
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

export async function getNewChatInbox(id: string) {
    try {
        const response = await http.get(baseURL + `/get-new-chat/${id}`);
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

