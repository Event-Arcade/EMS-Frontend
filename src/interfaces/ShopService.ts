export default interface ShopService {
    id?: number;
    name: string;
    description?: string;
    rating?: number;
    price: number;
    shopId: number;
    categoryId: number;
    shopServiceStaticResourcesUrls?: string[]|null;
    shopServiceStaticResourcesFiles?: File[]|null;
}