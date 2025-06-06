import type { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export interface LoginError extends Omit<AxiosError, 'response'> {
  response: AxiosResponse<{
    error: {
      error: string
    }
  }>;
}

export const LoginSchema = z.strictObject({
  email: z.string().email("Correo electrónico inválido").min(1, "Correo electrónico es requerido"),
  password: z.string().min(1, "Contraseña es requerida")
})

export const ERROR_UNAUTHORIZED_LOGIN = 'Unauthorized'
export const ERROR_UNAUTHORIZED_LOGIN_MESSAGE = 'Correo electronico o contraseña incorrecta.';
