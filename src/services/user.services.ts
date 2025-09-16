import { promises as fs } from "fs";
import { type IUser } from "../interfaces/user.interface.ts";
import { dirname,join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../models/users.json');

const getUserService = async (id:string):Promise<IUser|null> => {
    const data = await fs.readFile(filePath, 'utf-8');
    // SELECT * FROM USERS WHERE ID = id
    const users:IUser[] = JSON.parse(data) as IUser[];
    const user = users.find(user => user.id === id) || null;
    return user;
}

const getUsersService = async ():Promise<IUser[]> => {
    // SELECT * FROM USERS
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as IUser[];
}

const createUserService = async (user:IUser):Promise<IUser> => {
    const data = await fs.readFile(filePath, 'utf-8');
    const users:IUser[] = JSON.parse(data) as IUser[];
    // INSERT INTO USERS VALUES (...)
    users.push(user);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
    return user;
}

const deleteUserService = async (id:string):Promise<void> => {
    const data = await fs.readFile(filePath, 'utf-8');
    const users:IUser[] = JSON.parse(data) as IUser[];
    // DELETE FROM USERS WHERE ID = id
    const newUsers = users.filter(user => user.id !== id);
    await fs.writeFile(filePath, JSON.stringify(newUsers, null, 2), 'utf-8');
}

const updateUserService = async (id:string, user:IUser):Promise<IUser|null> => {
    const data = await fs.readFile(filePath, 'utf-8');
    const users:IUser[] = JSON.parse(data) as IUser[];  
    // UPDATE USERS SET ... WHERE ID = id
    const index = users.findIndex(user => user.id === id);
    if(index === -1) return null;
    users[index] = user;
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
    return user;
}

export { getUserService, getUsersService, createUserService, deleteUserService, updateUserService };