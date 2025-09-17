import { promises as fs } from "fs";
import { type IUser } from "../interfaces/user.interface.ts";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, "../models/users-large.jsonl")

async function ensureFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

// get all users
const getUsersService = async (): Promise<IUser[]> => {
  await ensureFile();
  const data = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(data) as IUser[]
}

// export async function getAllUsers(): Promise<IUser[]> {
//   await ensureFile();
//   const data = await fs.readFile(filePath, "utf-8");
//   return JSON.parse(data);
// }


// get user by id
const getUserByIdService = async (id: number): Promise<IUser | null> => {
  const users = await getUsersService()
  return users.find((u) => u.id === id) || null
} 



// create user

const createUserService = async (newUser: IUser): Promise<IUser> => {
  await ensureFile();
  const users = await getUsersService();
  users.push(newUser)
  await fs.writeFile(filePath, JSON.stringify(users, null, 2))
  return newUser
}



// export async function addUser(user: IUser): Promise<IUser> {
//   await ensureFile();
//   const users = await getAllUsers();
//   users.push(user);
//   await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8");
//   return user;
// }



// delete user by id

const deleteUserByIdService = async (id: number): Promise<IUser | null> => {
  await ensureFile();
  const users = await getUsersService();
  const user = users.find((u) => u.id === id)
  if(!user) {
    return null
  }
  const filteredUsers = users.filter((b) => b.id !== id)
  await fs.writeFile(filePath, JSON.stringify(filteredUsers, null, 2))
  return user
}




// update user by id

const updateUserByIdService = async (id: number, updatedUser: Partial<IUser>): Promise<IUser | null> =>{
  await ensureFile();
  const users = await getUsersService();
  const userIndex = users.findIndex((u) => u.id === id)
  if (userIndex === -1){
    return null;
  } else{
    const user = users[userIndex];
    const updated: IUser = {
      id: user.id,
      name: updatedUser.name ?? user.name,
      role: updatedUser.role ?? user.role,
      email: updatedUser.email ?? user.email,
      createdAt: updatedUser.createdAt ?? user.createdAt,
      isActive: updatedUser.isActive ?? user.isActive
    };
    users[userIndex] = updated;
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    return updated;
  }
}

export { getUsersService, getUserByIdService, createUserService, deleteUserByIdService, updateUserByIdService }