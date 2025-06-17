import { AccountProvider } from "../types/accounts.types";

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