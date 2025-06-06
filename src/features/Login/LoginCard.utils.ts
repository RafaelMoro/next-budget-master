import axios from "axios";

export interface LoginData {
  accessToken: string;
  user: {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    _id: string
    __v: number
  }
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const LoginMutationFn = (data: LoginPayload): Promise<LoginData> => {
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/`
  return axios.post(uri, data)
}