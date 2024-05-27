export default interface Shop {
    id?: number;
    name: string;
    description?: string;
    rating?: number;
    ownerId: string;
    backgroundImageURL?: string;
    backgroundImageFile?: File | null;
    }