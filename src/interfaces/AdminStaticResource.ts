export default interface AdminStaticResource {
    id?: number;
    name: string;
    description?: string;
    resourceUrl?: string;
    resourceFile?: File;
    adminId: string;
}