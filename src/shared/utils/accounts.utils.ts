import { getAccountProvider, getTerminationFormatted } from "../lib/accounts.lib"
import { AccountBank, AccountTypes } from "../types/accounts.types"
import { formatNumberToCurrency } from "./formatNumberCurrency.utils"

export const transformAccountsDisplay = ({ accounts }: { accounts: AccountBank[] }) => {
  return accounts.map((account) => ({
    accountId: account._id,
    name: account.title,
    amount: formatNumberToCurrency(account.amount),
    // We're sure the account type is not other string than type AccountTypes
    type: (account.accountType as AccountTypes),
    alias: account.alias,
    terminationFourDigits: account.terminationFourDigits,
    terminationFourDigitsTransformed: getTerminationFormatted(account.terminationFourDigits),
    accountProvider: getAccountProvider(account.accountProvider) // Default to mastercard if not provided
  }))
}