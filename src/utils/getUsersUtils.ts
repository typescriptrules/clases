import { type User } from '../types/Users.ts';
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "../models/users.json");

const getUsers = async (): Promise<User[]> => {
    const data = await fs.readFile(filePath, "utf-8")
    return JSON.parse(data) as User[];
}

export { getUsers };