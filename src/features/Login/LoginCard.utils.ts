import { LoginData, LoginPayload } from "@/shared/types/Login.types";
import axios from "axios";

export const LoginMutationFn = (data: LoginPayload): Promise<LoginData> => {
  return axios.post('/api', data)
}