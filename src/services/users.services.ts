import { promises as fs } from "fs";
import type { IUser } from "../interfaces/use.interface.ts";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, "../models/user.json");

export const getUserService = async(): Promise<IUser[]> => {
    const response = await fs.readFile(filePath, "utf-8")
    return JSON.parse(response) as IUser[]
}

