import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../interfaces/user";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "../services/userServices";
import { sendEmail } from "../services/emailService";

export async function listUsers(req: Request, res: Response) {
  const users = await getUsers();
  res.json(users);
}

export async function getUser(req: Request, res: Response) {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
}

export async function addUser(req: Request, res: Response) {
  const { name, email, crew } = req.body;
  const newUser: IUser = { id: uuidv4(), name, email, crew };
  const user = await createUser(newUser);
  // Enviar email de bienvenida (no bloqueante para la respuesta)
  (async () => {
    try {
      await sendEmail(
        user.email,
        "¡Bienvenido a API Services!",
        {
          text: `Hola ${user.name}, gracias por registrarte en API Services.`,
          html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
              <h2 style="color: #0056b3;">¡Bienvenido, ${user.name}!</h2>
              <p>Gracias por registrarte en <strong>API Services</strong>. A partir de ahora recibirás nuestros reportes y novedades.</p>
              <p style="font-size: 12px; color: #777;">Si no fuiste tú quien se registró, ignora este correo.</p>
            </div>
          `,
        }
      );
    } catch (err) {
      console.error("No se pudo enviar el email de bienvenida:", err);
    }
  })();

  res.status(201).json(user);
}

export async function editUser(req: Request, res: Response) {
  const user = await updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json(user);
}

export async function removeUser(req: Request, res: Response) {
  const deleted = await deleteUser(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Usuario no encontrado" });
  res.json({ success: true });
}
