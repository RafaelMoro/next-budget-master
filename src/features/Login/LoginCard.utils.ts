import { LoginData, LoginPayload } from "@/shared/types/Login.types";
import axios from "axios";

export const LoginMutationFn = (data: LoginPayload): Promise<LoginData> => {
  // const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/`
  return axios.post('/api', data)
}