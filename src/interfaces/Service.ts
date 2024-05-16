export default interface Service {
    id?: string;
    name: string;
    description?: string;
    rating?: number;
    ownerId: string;
    price: number;
    shopId: string;
    staticResourcesUrl?: string[]|null;
    staticResourcesFiles?: File[]|null;
    }