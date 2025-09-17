import { promises as fs } from "fs";
import type { IUser } from "../interfaces/user.interface.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const filePath   = join(__dirname, "../models/users.json");

const ensureFile = async () => {
    try { await fs.access(filePath); }
    catch { await fs.writeFile(filePath, "[]", "utf-8"); }
};

export const getUsersService = async (): Promise<IUser[]> => {
    await ensureFile();
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as IUser[];
};

export const getUserByIdService = async (id: number): Promise<IUser | null> => {
    const users = await getUsersService();
    return users.find(u => u.id === id) ?? null;
};

export const createUserService = async (payload: Omit<IUser, "id">): Promise<IUser> => {
    const users = await getUsersService();
    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const toCreate: IUser = { id: nextId, ...payload };
    users.push(toCreate);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
    return toCreate;
};

export const updateUserService = async (id: number, data: Partial<IUser>): Promise<IUser | null> => {
    const users = await getUsersService();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    const updated: IUser = { ...users[idx], ...data, id: users[idx].id };
    users[idx] = updated;
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
    return updated;
};

export const deleteUserService = async (id: number): Promise<boolean> => {
    const users = await getUsersService();
    const filtered = users.filter(u => u.id !== id);
    if (filtered.length === users.length) return false;
    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
};
