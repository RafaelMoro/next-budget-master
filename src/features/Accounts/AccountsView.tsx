"use client"
import { useState, useEffect } from "react";
import { AccountBank, AccountsDisplay } from "@/shared/types/accounts.types";
import { Account } from "./Accounts";
import { getAccountProvider } from "@/shared/lib/accounts.lib";
import { formatNumberToCurrency } from "@/shared/utils/formatNumberCurrency.utils";

interface AccountsViewProps {
  accounts: AccountBank[];
}

export const AccountsView = ({ accounts }: AccountsViewProps) => {
  const [accountsDisplay, setAccountsDisplay] = useState<AccountsDisplay[]>([])

  useEffect(() => {
    if (accounts.length > 0) {
      const formattedAccounts: AccountsDisplay[] = accounts.map((account) => ({
        accountId: account._id,
        name: account.title,
        amount: formatNumberToCurrency(account.amount),
        type: account.accountType,
        accountProvider: getAccountProvider(account.accountProvider) // Default to mastercard if not provided
      }))
      setAccountsDisplay(formattedAccounts)
    }
  }, [accounts])

  if (accountsDisplay.length > 0) {
    return accountsDisplay.map((acc) => (
      <Account
        key={acc.accountId}
        name={acc.name}
        balance={acc.amount}
        accountType={acc.type}
        // Adding default mastercard value as accountProvider is a optional prop in the interface AccountsDisplay
        accountProvider={acc.accountProvider ?? 'mastercard'}
      />
    ))
  }
}