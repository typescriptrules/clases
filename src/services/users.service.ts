import { promises as fs } from "fs";
import path from "path";
import type { IUser } from "../interfaces/book.interface.ts";

const FILE_PATH = path.join(__dirname, "users.jsonl");

async function ensureFile() {
    try {
        await fs.access(FILE_PATH);
    } catch {
        await fs.writeFile(FILE_PATH, "[]", "utf-8");
    }
}

export async function getAllUsers(): Promise<IUser[]> {
    await ensureFile();
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
}

export async function getUserByName(name: string): Promise<IUser | undefined> {
    const users = await getAllUsers();
    return users.find((user) => user.name === name);
}

export async function addUser(user: IUser): Promise<IUser> {
    await ensureFile();
    const users = await getAllUsers();
    users.push(user);
    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
    return user;
}

export async function updateUserByName(
    name: string,
    updatedFields: Partial<IUser>
): Promise<IUser | undefined> {
    const users = await getAllUsers();
    const index = users.findIndex((user) => user.name === name);

    if (index === -1) {
        return undefined;
    }

    users[index] = { ...users[index], ...updatedFields as IUser};
    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
    return users[index];
}

export async function deleteUserByName(name: string): Promise<boolean> {
    const users = await getAllUsers();
    const filteredUsers = users.filter((user) => user.name !== name);

    if (filteredUsers.length === users.length) {
        return false; // no se eliminó nada
    }

    await fs.writeFile(FILE_PATH, JSON.stringify(filteredUsers, null, 2), "utf-8");
    return true;
}
