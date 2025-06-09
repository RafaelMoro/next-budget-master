import { CreateUserData, CreateUserPayload, ForgotPasswordData, ForgotPasswordPayload, LoginData, LoginPayload } from "@/shared/types/Login.types";
import axios from "axios";

export const LoginMutationFn = (data: LoginPayload): Promise<LoginData> => {
  return axios.post('/api', data)
}

export const createUserCb = (data: CreateUserPayload): Promise<CreateUserData> => {
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  return axios.post(`${uri}/users`, data)
}

export const forgotPasswordCb = (data: ForgotPasswordPayload): Promise<ForgotPasswordData> => {
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  return axios.post(`${uri}/users/forgot-password`, data)
}