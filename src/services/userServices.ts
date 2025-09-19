import { promises as fs } from "fs";
import { IUser } from "../interfaces/user";

const DB_FILE = "db.json";

async function readDB(): Promise<{ users: IUser[] }> {
  try {
    const data = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { users: [] };
  }
}

async function writeDB(data: { users: IUser[] }) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

export async function getUsers(): Promise<IUser[]> {
  const db = await readDB();
  return db.users;
}

export async function getUserById(id: string): Promise<IUser | null> {
  const db = await readDB();
  return db.users.find(u => u.id === id) || null;
}

export async function createUser(user: IUser): Promise<IUser> {
  const db = await readDB();
  db.users.push(user);
  await writeDB(db);
  return user;
}

export async function updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
  const db = await readDB();
  const index = db.users.findIndex(u => u.id === id);
  if (index === -1) return null;
  db.users[index] = { ...db.users[index], ...updates };
  await writeDB(db);
  return db.users[index];
}

export async function deleteUser(id: string): Promise<boolean> {
  const db = await readDB();
  const newUsers = db.users.filter(u => u.id !== id);
  if (newUsers.length === db.users.length) return false;
  db.users = newUsers;
  await writeDB(db);
  return true;
}
