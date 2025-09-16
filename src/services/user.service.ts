import { promises as fs } from "fs"
import type { User } from "../interfaces/user.interface.ts"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const filePath = join(__dirname, "../models/user.json")

export const getUsers = async (): Promise<User[]> => {
  const data = await fs.readFile(filePath, "utf-8")
  console.log('filePath', filePath)
  return JSON.parse(data) as User[]
}

export const getUserById = async (id: string): Promise<User | null> => {
  const users = await getUsers()
  return users.find((user) => user.id === id) || null
}

export const addUser = async (newUser: User): Promise<void> => {
    const users = await getUsers()
    users.push(newUser)
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf-8")   
}

export const deleteUser = async (id: string): Promise<boolean> => {
  const users = await getUsers()
  const filtered = users.filter((user) => user.id !== id)

  if (filtered.length === users.length) {
    return false
  }

  await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), "utf-8")
  return true
}