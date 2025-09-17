export interface IUser {
    id: string;
    name:string;
    role: "admin" | "user";
    age: number;
    email: string;
}