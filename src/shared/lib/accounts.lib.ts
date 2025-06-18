import axios from "axios";
import { AccountProvider, EditAccountData, EditAccountPayload } from "../types/accounts.types";

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
  const uri = process.env.NEXT_PUBLIC_BACKEND_URI
  if (!uri) {
    throw new Error("Backend URI is not defined");
  }
  return axios.put(`${uri}/account-actions/`, data)
}