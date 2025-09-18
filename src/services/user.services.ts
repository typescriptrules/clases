import { promises as fs } from "fs";
import type { IUser } from "../interfaces/user.interface.ts";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "../models/user.json");



export const getUserService = async(): Promise<IUser[]> => {
    const response = await fs.readFile(filePath, "utf-8")
    return JSON.parse(response) as IUser[]
}

export const getUserIdService = async (id: string): Promise<IUser | null> => {
  const response = await getUserService();
  return response.find((res) => res.id === id) || null;
};

export const postUserService = async (newUser: IUser): Promise<void> => {
  const response = await getUserService();
  response.push(newUser);
  return fs.writeFile(filePath, JSON.stringify(response));
};

export const deleteUserService = async (id: string): Promise<boolean> => {
  const response = await getUserService();
  const data = response.filter((user) => user.id !== id);
  await fs.writeFile(filePath, JSON.stringify(data));
  return true;
};

export const updateUserService = async (id: string, updates: Partial<Omit<IUser, 'id'>>): Promise<IUser | null> => {
    const users = await getUserService()

    const index = users.findIndex(b => b.id === id)

    if (index === -1) return null

    const user = users[index]!

    const updatedUser: IUser = { ...user, ...updates, id: user.id }

    users[index] = updatedUser

    await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8')

    return updatedUser
}
