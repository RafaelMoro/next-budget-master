"use client"
import { Dropdown, DropdownItem } from "flowbite-react"
import { RiExpandUpDownLine } from "@remixicon/react";
import { AccountBank, AccountsDisplay } from "@/shared/types/accounts.types";
import { formatNumberToCurrency } from "@/shared/utils/formatNumberCurrency.utils";
import { useEffect, useState } from "react";

interface DropdownSelectAccountProps {
  accounts: AccountBank[];
  cssClass?: string;
}
/**
 * Component Description:
 * For desktop, This button component is shown in the aside bar of the dashboard to select other account.
 * For mobile, it's shown in the drawer menu of the header
 * 
 * Caveats: I cannot have the custom element of the prop renderTrigger in a separate component as the dropdown when clicked,
 * it does not trigger the onclick event.
 */
export const DropdownSelectAccount = ({ accounts, cssClass }: DropdownSelectAccountProps) => {
  const [accountsDisplay, setAccountsDisplay] = useState<AccountsDisplay[]>([])
  const [selectedAccount, setSelectedAccount] = useState<AccountsDisplay | null>(null)
  const [accountsOptions, setAccountsOptions] = useState<AccountsDisplay[]>([])

  useEffect(() => {
    if (accounts.length > 0) {
      const formattedAccounts: AccountsDisplay[] = accounts.map((account) => ({
        accountId: account._id,
        name: account.title,
        amount: formatNumberToCurrency(account.amount),
        type: account.accountType
      }))
      setAccountsDisplay(formattedAccounts)
      const [firstAccount] = formattedAccounts;
      setSelectedAccount(firstAccount)
      const options = formattedAccounts.filter(acc => acc.accountId !== firstAccount.accountId)
      setAccountsOptions(options)
    }
  }, [accounts])

  const handleSelectAccount = (accountId: string) => {
    const selected = accountsOptions.find(acc => acc.accountId === accountId)
    if (!selected) {
      console.warn('Account not found in options:', accountId);
      return;
    }
    const newOptions = accountsDisplay.filter(acc => acc.accountId !== accountId)
    setAccountsOptions(newOptions)
    setSelectedAccount(selected)
  }

  return (
    <div className={cssClass && cssClass}>
      <Dropdown aria-label="Select other account" label="" renderTrigger={() => (
        <article
          className="flex justify-between w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900 focus:ring-2 focus:ring-indigo-200 focus:dark:ring-indigo-700/30 focus:border-indigo-500 focus:dark:border-indigo-700"
          >
          <div className="flex flex-col gap-2 items-start">
            <p className="text-sm">{selectedAccount?.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{selectedAccount?.amount}</p>
            <span className="bg-blue-100 max-w-min text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
              {selectedAccount?.type}
            </span>
          </div>
          <RiExpandUpDownLine className="cursor-pointer" strokeWidth={1} />
        </article>
      )}>
        { accountsOptions.length > 0 && accountsOptions.map((acc) => (
            <DropdownItem className="flex justify-between" onClick={() => handleSelectAccount(acc.accountId)} key={acc.accountId}>
              <div className="flex flex-col gap-1 items-start">
                <span>{acc.name}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{acc.type}</span>
              </div>
              <span>{acc.amount}</span>
            </DropdownItem>
        )) }
      </Dropdown>
    </div>
  )
}