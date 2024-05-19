export default interface Shop {
    id?: string;
    name: string;
    description?: string;
    rating?: number;
    ownerId: string;
    backgroundImageUrl?: string;
    backgroundImageFile?: File | null;
    }