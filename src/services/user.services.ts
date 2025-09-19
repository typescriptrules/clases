import {promises as fs } from "fs"
import { type IUser } from "../interfaces/user.interface.ts"
import {dirname, join } from "path"
import { fileURLToPath } from "url"


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filePath = join(__dirname, "../models/user.json")

const getusersService = async (): Promise<IUser[]> => {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data) as IUser[]
}

const getusersIDService = async (id:string): Promise<IUser | null> => {
    const users = await getusersService();
    const user = users.find(b => b.id === id)
    return user || null;
}

const postuserService = async (newUser:IUser): Promise<IUser> => {
    const  users = await getusersService();
    users.push(newUser)
    await fs.writeFile(filePath, JSON.stringify(users, null, 4), "utf-8")
    return newUser;

}

const putuserService = async (id:string, updateData: Partial<IUser>): Promise<IUser | null> => {
    const  users = await getusersService();
    const index = users.findIndex(b => b.id === id)
    if (index === -1) {
        return null
    }
    users[index] = {...users[index]!, ...updateData, id};
    await fs.writeFile(filePath, JSON.stringify(users,null,4), "utf-8")
    return users[index];
    
}

const deleteuserService = async (id:string): Promise<boolean> => {
    const users = await getusersService();
    const index = users.findIndex(b => b.id === id)
    if (index === -1) {
        return false
    }
    const [deleteUser] = users.splice(index,1);
    await fs.writeFile(filePath, JSON.stringify(users,null,4), "utf-8")
    return true
}

export {getusersService, getusersIDService, postuserService, putuserService, deleteuserService}