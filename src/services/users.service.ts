import {promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import type { IUsers } from "../interfaces/users.interface.ts";
import { get } from "http"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "../models/users.json");

const getUsersService = async (): Promise<IUsers[]> => {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data) as IUsers[];
}

const getUsersIDservice = async (id:number): Promise<IUsers | null> => {
    const  users = await getUsersService();
    const user = users.find(b => b.id === id)
    return user || null;
}

const postUsersService = async (newUser:IUsers): Promise<IUsers> => {
    const  users = await getUsersService();
    users.push(newUser)
    await fs.writeFile(filePath, JSON.stringify(users, null, 4), "utf-8")
    return newUser;

}

const putUsersService = async (id:number, updateData: Partial<IUsers>): Promise<IUsers | null> => {
    const  users = await getUsersService();
    const index = users.findIndex(b => b.id === id)
    if (index === -1) {
        return null
    }
    users[index] = {...users[index]!, ...updateData, id};
    await fs.writeFile(filePath, JSON.stringify(users,null,4), "utf-8")
    return users[index];
    
}

const deleteUsersService = async (id:number): Promise<boolean> => {
    const users = await getUsersService();
    const index = users.findIndex(b => b.id === id)
    if (index === -1) {
        return false
    }
    const [deletedBook] = users.splice(index,1);
    await fs.writeFile(filePath, JSON.stringify(users,null,4), "utf-8")
    return true
}

export {getUsersService, getUsersIDservice, postUsersService, putUsersService, deleteUsersService}