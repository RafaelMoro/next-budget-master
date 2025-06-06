import axios from "axios";
import { NEXT_PUBLIC_BACKEND_URI } from "@/config";

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

export const LoginMutationFn = (data: LoginPayload) => {
  console.log('data', data)
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth`
  console.log('uri', uri)
  return axios.post(uri, data)
}

export const LoginSuccess = () => {

}