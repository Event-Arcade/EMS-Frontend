export default interface ShopService {
    id?: number;
    name: string;
    description?: string;
    rating?: number;
    price: number;
    shopId: number;
    categoryId: number;
    shopServiceStaticResourcesURLs?: string[]|null;
    shopServiceStaticResourcesFiles?: File[]|null;
}