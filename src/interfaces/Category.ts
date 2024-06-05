export default interface Category {
    id?: number;
    name: string;
    description: string;
    categoryImagePath?: string;
    imageFile?: File | null;
    }