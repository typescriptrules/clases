import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { IUser } from "../interfaces/book.interface.ts";
import type { StreamResult } from "../interfaces/streamUser.Interface.ts";
import { Transform } from "stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, "users.json");


export function getUserStreamService(): { transform: Transform; result: StreamResult } {
  const result: StreamResult = {
    users: [],
    totalProcessed: 0,
    memoryUsage: "",
  };

  let leftover = "";

  const jsonTransform = new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const data = leftover + chunk.toString();
      const lines = data.split("\n");
      leftover = lines.pop() || "";

      for (const line of lines) {
        if (line.trim()) {
          try {
            const user = JSON.parse(line);
            result.totalProcessed++;

            //mostrar solo los primeros 10 usuarios
            if (result.users.length < 10) result.users.push(user);

            if (result.totalProcessed % 1000 === 0) {
              console.log(`Procesadas ${result.totalProcessed} líneas...`);
            }
          } catch (err){
            console.error("Error parsing JSON line:", err);
          }
        }
      }
      callback();
    },
    flush(callback) {
      if (leftover.trim()) {
        try {
          const user = JSON.parse(leftover);
          result.totalProcessed++;

          if (result.users.length < 10) result.users.push(user);
        } catch (err) {
          console.error("Error parsing JSON line:", err);
        }
      }

      result.memoryUsage = `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`;
      callback();
    }
  });

  return { transform: jsonTransform, result };
}


export async function getUserByNameService(name:string): Promise<IUser | undefined> {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  const users = JSON.parse(data) as IUser[];

  return users.find((user) => user.name === name) || undefined;
}


export async function addUserService(user: IUser): Promise<IUser> {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  const users: IUser[] = JSON.parse(data);
  users.push(user);
  await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2));

  return user;
}


export async function updateUserService(name: string, updatedUser: Partial<IUser>): Promise<IUser | null> {
  const file = await fs.readFile(FILE_PATH, "utf-8")
    const users: IUser[] = JSON.parse(file)
    const index = users.findIndex((user) => user.name === name)

    if(index === -1) {
      return null
    }

    const updated: IUser = {
      name: updatedUser.name ?? users[index]!.name,
      role: updatedUser.role ?? users[index]!.role,
    }

    users[index] = updated
    await fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2))

    return updated
}

export async function deleteUserService(name: string): Promise<boolean> {
  const file = await fs.readFile(FILE_PATH, "utf-8");
  const users: IUser[] = JSON.parse(file);
  const filteredUsers = users.filter((user) => user.name !== name);

  if (users.length === filteredUsers.length) {
    return false; // No user found to delete
  }

  await fs.writeFile(FILE_PATH, JSON.stringify(filteredUsers, null, 2));
  return true; // User deleted successfully
}