import { promises as fs } from "fs";
import path from "path";
import type { IUser } from "../interface/book.interface.ts";

const FILE_PATH = path.join(__dirname, "users.json");

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

export async function addUser(user: IUser): Promise<IUser> {
  await ensureFile();
  const users = await getAllUsers();
  users.push(user);
  await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
  return user;
}
