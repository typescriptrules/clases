import { promises as fs } from 'fs';
import { createReadStream } from "fs";
import readline from "readline";
import type { IUser } from '../interfaces/book.interface.ts';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../models/users-large.jsonl');

const getUsersService = async (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    const users: IUser[] = [];

    try {
      const stream = createReadStream(filePath, { encoding: "utf-8" });
      const rl = readline.createInterface({ input: stream });

      rl.on("line", (line) => {
        if (line.trim() === "") return; // saltar líneas vacías
        try {
          const user: IUser = JSON.parse(line);
          users.push(user);
        } catch (err) {
          console.error("Error parseando línea:", err);
        }
      });

      rl.on("close", () => resolve(users));
      rl.on("error", (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

const getUserByIdService = async (id: string): Promise<IUser | null> => {
  return new Promise((resolve, reject) => {
    try {
      const stream = createReadStream(filePath, { encoding: "utf-8" });
      const rl = readline.createInterface({ input: stream });

      rl.on("line", (line) => {
        if (line.trim() === "") return; // saltar líneas vacías
        const user: IUser = JSON.parse(line);
        user.id = String(user.id);

        if (String(user.id) === String(id)) {
          rl.close(); // detener la lectura
          stream.close();
          resolve(user);
        }
      });

      rl.on("close", () => {
        resolve(null); // no se encontró el usuario
      });

      rl.on("error", (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });
};

const createUserService = async (user: IUser): Promise<IUser> => {
  try {
    if (!user.id) {
      user.id = Date.now().toString();
    }

    const line = JSON.stringify(user) + "\n";
    await fs.appendFile(filePath, line, "utf-8");

    return user;
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Could not create user");
  }
};

const deleteUserService = async (id: string): Promise<boolean> => {
  const tempFilePath = filePath + ".tmp"; // archivo temporal

  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath, { encoding: "utf-8" });
    const rl = readline.createInterface({ input: stream });

    const tempLines: string[] = [];
    let found = false;

    rl.on("line", (line) => {
      if (line.trim() === "") return;

      try {
        const user: IUser = JSON.parse(line);
        if (String(user.id) === String(id)) {
          found = true; // no guardamos esta línea (la eliminamos)
        } else {
          tempLines.push(line);
        }
      } catch (err) {
        console.error("Error parseando línea:", err);
      }
    });

    rl.on("close", async () => {
      try {
        await fs.writeFile(tempFilePath, tempLines.join("\n") + "\n", "utf-8");
        await fs.rename(tempFilePath, filePath); // reemplazar original
        resolve(found);
      } catch (err) {
        reject(err);
      }
    });

    rl.on("error", (err) => reject(err));
  });
};

const updateUserService = async (id: string, updatedUser: Partial<IUser>): Promise<IUser | null> => {
  const tempFilePath = filePath + ".tmp"; // archivo temporal

  return new Promise((resolve, reject) => {
    const stream = createReadStream(filePath, { encoding: "utf-8" });
    const rl = readline.createInterface({ input: stream });

    const tempLines: string[] = [];
    let foundUser: IUser | null = null;

    rl.on("line", (line) => {
      if (line.trim() === "") return;

      try {
        const user: IUser = JSON.parse(line);

        if (String(user.id) === String(id)) {
          // Mezclamos datos actuales + actualizados
          foundUser = { ...user, ...updatedUser };
          tempLines.push(JSON.stringify(foundUser));
        } else {
          tempLines.push(line);
        }
      } catch (err) {
        console.error("Error parseando línea:", err);
      }
    });

    rl.on("close", async () => {
      try {
        await fs.writeFile(tempFilePath, tempLines.join("\n") + "\n", "utf-8");
        await fs.rename(tempFilePath, filePath); // reemplaza archivo original
        resolve(foundUser);
      } catch (err) {
        reject(err);
      }
    });

    rl.on("error", (err) => reject(err));
  });
};

export { getUsersService, getUserByIdService, createUserService, deleteUserService, updateUserService };
