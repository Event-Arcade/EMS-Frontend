import SubPackage from "./SubPackage";

export default interface Package {
    id?: number;
    status?: string;
    userId: string
    subPackages: SubPackage[]
}