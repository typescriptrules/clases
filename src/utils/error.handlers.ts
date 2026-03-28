import { type Response } from "express"
import { type HttpErrorStatus } from "../types/types.ts"

/**
 * Maneja los errores y responde con un formato estándar.
 *
 * @param res Express response
 * @param message Mensaje de error (para el cliente)
 * @param code Código HTTP (por defecto 500)
 * @param details Información adicional opcional (ej. error real, validaciones, etc.)
 */
const handleHttp = (
  res: Response,
  message: string,
  code: HttpErrorStatus = 500,
  details?: unknown
) => {
  console.error(`[ERROR ${code}] ${message}`, details ?? "")

  res.status(code).json({
    ok: false,
    error: message,
    ...(details ? { details } : {}), 
  })
}

export { handleHttp }
