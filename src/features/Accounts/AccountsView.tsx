"use client"
import { useState, useEffect } from "react";
import { AccountBank, AccountsDisplay } from "@/shared/types/accounts.types";
import { Account } from "./Accounts";
import { getAccountProvider } from "@/shared/lib/accounts.lib";
import { formatNumberToCurrency } from "@/shared/utils/formatNumberCurrency.utils";
import { Button } from "flowbite-react";
import Image from "next/image";

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
    return (
      <section className="w-full grid grid-cols-4 gap-4">
        { accountsDisplay.map((acc) => (
          <Account
            key={acc.accountId}
            name={acc.name}
            balance={acc.amount}
            accountType={acc.type}
            // Adding default mastercard value as accountProvider is a optional prop in the interface AccountsDisplay
            accountProvider={acc.accountProvider ?? 'mastercard'}
          />
        )) }
      </section>
    )
  }

  return (
    <section className="mt-10 flex flex-col items-center gap-8">
      <h2 className="text-2xl  font-semibold">Aún no tienes cuentas registradas</h2>
      <p className="text-xl text-gray-600 dark:text-gray-400">¡Todo empieza aquí! Agrega una cuenta bancaria y empieza a organizar tus finanzas sin estrés.</p>
      <Image src="/img/no-accounts-found.webp" width={289} height={296} alt="No accounts found" />
      <div>
        <Button>Crear cuenta</Button>
      </div>
    </section>
  )
}