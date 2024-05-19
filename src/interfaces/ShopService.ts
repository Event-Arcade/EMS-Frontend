export default interface ShopService {
    id?: number;
    name: string;
    description?: string;
    rating?: number;
    ownerId: string;
    price: number;
    shopId: string;
    shopServiceStaticResourcesUrls?: string[]|null;
    shopServiceStaticResourcesFiles?: File[]|null;
}