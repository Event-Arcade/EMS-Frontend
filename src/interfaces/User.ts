export interface User {
    id: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postalCode: string;
    province: string;
    longitude: number;
    latitude: number;
    email: string;
    profilePictureUrl: string | null;
    role: string;
}