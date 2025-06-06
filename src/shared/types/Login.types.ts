import type { AxiosError, AxiosResponse } from "axios";
import { object, string } from "yup";

export interface LoginError extends Omit<AxiosError, 'response'> {
  response: AxiosResponse<{
    error: {
      error: string
    }
  }>;
}

const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;

// Errors
export const ERROR_UNAUTHORIZED_LOGIN = 'Unauthorized'
export const ERROR_UNAUTHORIZED_LOGIN_MESSAGE = 'Correo electronico o contraseña incorrecta.';
export const ERROR_PASSWORD_REQUIRED = 'Contraseña es requerida'
export const ERROR_EMAIL_REQUIRED = 'Correo electrónico es requerido';
export const ERROR_INVALID_EMAIL = 'Correo electrónico inválido';

export const LoginSchema = object({
  email: string().required(ERROR_EMAIL_REQUIRED).matches(emailRegex, ERROR_INVALID_EMAIL),
  password: string().required(ERROR_PASSWORD_REQUIRED)
})

