import axios from "axios";
import { BankMovement, CreateExpenseData, CreateExpensePayload, CreateIncomeData, CreateIncomePayload } from "../types/records.types";
import { addToLocalStorage, removeFromLocalStorage } from "../lib/local-storage.lib";
import { EDIT_RECORD_KEY } from "../constants/local-storage.constants";

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

export const saveEditRecordLS = (recordToBeEdited: BankMovement) => {
  try {
    addToLocalStorage({ prop: EDIT_RECORD_KEY, newInfo: { record: recordToBeEdited } })
  } catch (error) {
    console.log('error while saving record to be edited in local storage', error)
  }
}

export const resetEditRecordLS = () => {
  try {
    removeFromLocalStorage({ prop: "edit-record" })
  } catch (error) {
    console.log('error while removing record to be edited in local storage', error)
  }
}