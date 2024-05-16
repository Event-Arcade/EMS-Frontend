import Service from "./Service";

export default interface Shop {
    id?: string;
    name: string;
    imageUrl?: string;
    imageFile?: File | null;
    //list of services
    services?: Service[];
    }