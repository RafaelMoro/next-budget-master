"use client"
import { useState, useEffect } from "react";
import { AccountBank, AccountModalAction, AccountsDisplay, AccountTypes } from "@/shared/types/accounts.types";
import { Account } from "./Accounts";
import { getAccountProvider, getTerminationFormatted } from "@/shared/lib/accounts.lib";
import { formatNumberToCurrency } from "@/shared/utils/formatNumberCurrency.utils";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import { AccountDetails } from "./AccountDetails";
import { EditAccount } from "./EditAccount";

interface AccountsViewProps {
  accounts: AccountBank[];
}

export const AccountsView = ({ accounts }: AccountsViewProps) => {
  const [accountsDisplay, setAccountsDisplay] = useState<AccountsDisplay[]>([])
  const [openAccModal, setOpenAccModal] = useState<boolean>(false)
  const [accDetails, setAccDetails] = useState<AccountsDisplay | null>(null)
  const [accAction, setAccAction] = useState<AccountModalAction | null>(null)

  const toggleAccModal = () => setOpenAccModal((prev) => !prev)
  const openModal = (acc: AccountsDisplay) => {
    toggleAccModal()
    setAccAction('view')
    setAccDetails(acc)
  }
  const closeModal = () => {
    toggleAccModal()
    setAccAction(null)
    setAccDetails(null)
  }
  const updateAccAction = (acc: AccountModalAction) => {
    setAccAction(acc)
  }

  useEffect(() => {
    if (accounts.length > 0) {
      const formattedAccounts: AccountsDisplay[] = accounts.map((account) => ({
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
      setAccountsDisplay(formattedAccounts)
    }
  }, [accounts])

  if (accountsDisplay.length > 0) {
    return (
      <section className="w-full grid lg:grid-cols-3 grid-cols-4 gap-4">
        { accountsDisplay.map((acc) => (
          <Account
            key={acc.accountId}
            account={acc}
            openModal={openModal}
          />
        )) }
        { accDetails && (
          <Modal show={openAccModal} onClose={closeModal}>
            { accAction === 'view' && (
              <AccountDetails
                account={accDetails}
                updateAccAction={updateAccAction}
              />
            )}
            { accAction === 'edit' && (
              <EditAccount
                account={accDetails}
                closeModal={closeModal}
                updateAccAction={updateAccAction}
              />
            )}
          </Modal>
        ) }
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