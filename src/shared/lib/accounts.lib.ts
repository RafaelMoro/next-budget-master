import { AccountProvider } from "../types/accounts.types";

export function getAccountProvider(provider: string | undefined): AccountProvider {
  return (
    provider === "mastercard" ||
    provider === "visa" ||
    provider === "americanExpress"
  )
    ? provider as AccountProvider
    : "mastercard";
}