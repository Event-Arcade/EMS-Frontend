export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postalCode: string;
    province: string;
    longitude: number;
    latitude: number;
    email: string;
    profilePictureURL?: string;
    profilePictureFile?: File
    role?: string;
    phoneNumber: string;
    password?: string
}