"use server"

import axios, { AxiosResponse } from "axios";
import { CreateUserData, CreateUserPayload } from "../types/Login.types";

export async function createUser(data: CreateUserPayload): Promise<CreateUserData> {
  try {
    const uri = process.env.NEXT_PUBLIC_BACKEND_URI
    if (!uri) {
      throw new Error("Backend URI is not defined");
    }

    const res: AxiosResponse<CreateUserData> = await axios.post(`${uri}/users`, data)
    // const res: CreateUserData = await axios.post(`${uri}/users`, data, {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`
    //   }
    // })
    return res.data;
  } catch (error) {
    console.log('erro', error)
    throw error;
  }
}