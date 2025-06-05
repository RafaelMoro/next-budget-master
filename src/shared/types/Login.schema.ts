import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Correo electrónico inválido").min(1, "Correo electrónico es requerido"),
  password: z.string()
})