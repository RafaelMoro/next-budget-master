import axios from "axios";
import { AccountProvider, CreateAccountData, CreateAccountPayload, DeleteAccountData, DeleteAccountPayload, EditAccountData, EditAccountPayload } from "../types/accounts.types";

export function getAccountProvider(provider: string | undefined): AccountProvider {
  return (
    provider === "mastercard" ||
    provider === "visa" ||
    provider === "american-express"
  )
    ? provider as AccountProvider
    : "mastercard";
}

export function getTerminationFormatted(terminationNumber: number | undefined) {
  if (terminationNumber) {
    return `**${terminationNumber}`
  }
  return "**XXXX";
}

export const editBankAccountCb = (data: EditAccountPayload): Promise<EditAccountData> => {
  return axios.put('api/accounts', data)
}

export const createBankAccountCb = (data: CreateAccountPayload): Promise<CreateAccountData> => {
  return axios.post('api/accounts', data)
}

export const deleteBankAccountCb = (data: DeleteAccountPayload): Promise<DeleteAccountData> => {
  return axios.delete('api/accounts', {
    data,
  })
}