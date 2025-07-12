import axios from "axios";
import { CreateExpenseData, CreateExpensePayload, CreateIncomeData, CreateIncomePayload } from "../types/records.types";

export const createExpenseCb = (data: CreateExpensePayload, accessToken: string): Promise<CreateExpenseData> => {
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  if (!accessToken) {
    throw new Error("Access token is not defined");
  }
  return axios.post(`${uri}/expenses-actions`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const createIncomeCb = (data: CreateIncomePayload, accessToken: string): Promise<CreateIncomeData> => {
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  if (!accessToken) {
    throw new Error("Access token is not defined");
  }
  return axios.post(`${uri}/incomes-actions`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}