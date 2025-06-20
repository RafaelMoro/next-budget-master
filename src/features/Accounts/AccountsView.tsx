"use client"
import { useState, useEffect } from "react";
import { AccountBank, AccountModalAction, AccountsDisplay, AccountTypes } from "@/shared/types/accounts.types";
import { Account } from "./Accounts";
import { getAccountProvider, getTerminationFormatted } from "@/shared/lib/accounts.lib";
import { formatNumberToCurrency } from "@/shared/utils/formatNumberCurrency.utils";
import { Modal } from "flowbite-react";
import { AccountDetails } from "./AccountDetails";
import { EditAccount } from "./EditAccount";
import { DeleteAccount } from "./DeleteAccount";
import { NoAccountsFoundView } from "./NoAccountsFoundView";

interface AccountsViewProps {
  accounts: AccountBank[];
}

/**
 * Shows a list of the accounts fetched
 * @param accounts - Accounts fetched 
 * @returns List of accounts with modal to edit, delete the account clicked
 */
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
      <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

            { accAction === 'delete' && (
              <DeleteAccount
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
    <NoAccountsFoundView />
  )
}