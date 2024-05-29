import http from "./httpsClient";
import {toast} from "react-toastify";

const baseURL = "/services"

export async function createService(formData: FormData) {
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
        return null;
    }
}

export async function deleteService(serviceId: number) {
    try {
        const response = await http.delete(baseURL + `/delete/${serviceId}`);
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
        return false;
    }
}

export async function getAllServices() {
    try {
        const { data } = await http.get(baseURL + "/getall");
        if(data.flag){
            return data.data;
            }
            else{
                return null;
            }
    } catch (error) {
        console.error("Error:", error);
        return;
    }
}

export async function updateService(serviceId: number, formData: FormData) {
    try {
        const { data } = await http.put(baseURL + `/update/${serviceId}`, formData);
        if (data.flag) {
            toast.success(data.message);
            return data.data;
        } else {
            toast.error(data.message);
            return null;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
