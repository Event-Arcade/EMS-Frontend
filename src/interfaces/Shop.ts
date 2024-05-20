export default interface Shop {
    id?: string;
    name: string;
    description?: string;
    rating?: number;
    ownerId: string;
    backgroundImageURL?: string;
    backgroundImageFile?: File | null;
    }