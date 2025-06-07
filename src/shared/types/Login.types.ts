import type { AxiosError, AxiosResponse } from "axios";
import { object, ObjectSchema, string } from "yup";

export interface LoginData {
  data: {
    user: {
      email: string;
      firstName: string;
      lastName: string;
      middleName: string;
      _id: string
      __v: number
    }
  }
  error: null;
  message: null;
  success: boolean;
  version: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
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

export type InputsPersonalInformation = {
  firstName: string
  middleName?: string
  lastName: string
}

export type FormDataRegister = {
  personalInformation: InputsPersonalInformation | null
}

export const PersonalInformationSchema: ObjectSchema<InputsPersonalInformation> = object({
  firstName: string().required('Primer nombre es requerido').min(2, 'El primer nombre debe tener al menos 2 caracteres'),
  middleName: string().optional(),
  lastName: string().required('Apellido es requerido').min(2, 'El apellido debe tener al menos 2 caracteres')
})

