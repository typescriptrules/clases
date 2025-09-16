import {promises as fs} from 'fs';
import type {IUser} from '../interfaces/user.interface.ts'
import {dirname, join} from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, '../models/users.json');

const getUsersService = async (): Promise<IUser[]> => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as IUser[];
}

const getUserByIdService = async (id: string | undefined): Promise<IUser | null> => {
    const users = await getUsersService();
    return users.find((user) => user.id === id) || null;
};

const createUserService = async (newUser: Omit<IUser, "id">): Promise<IUser> => {
    const users = await getUsersService();
    const maxId = users.length > 0 ? Math.max(...users.map((b) => Number(b.id))) : 0;
    const userWithId: IUser = {
        id: String(maxId + 1),
        ...newUser,
    };
    users.push(userWithId);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    return userWithId;
};

const updateUserService = async (
    id: string | undefined,
    updatedData: Partial<IUser>
): Promise<IUser | null> => {
    const users = await getUsersService();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;
    users[index] = {...users[index], ...updatedData} as IUser;
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    return users[index];
};


const deleteUserService = async (id: string | undefined): Promise<boolean> => {
    const users = await getUsersService();
    const filtered = users.filter((user) => user.id !== id);
    if (users.length === filtered.length) return false;

    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
    return true;
};

export {
    getUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService,
};