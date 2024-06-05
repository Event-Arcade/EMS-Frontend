export default interface ShopService {
    id?: number;
    name: string;
    description?: string;
    rating?: number;
    price: number;
    shopId: number;
    categoryId: number;
    noOfGuests?: number;
    shopServiceOwner?: string;
    indoor: boolean;
    outdoor: boolean;
    shopServiceStaticResourcesURLs?: string[]|null;
    shopServiceStaticResourcesFiles?: File[]|null;
}