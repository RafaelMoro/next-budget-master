"use client"
import { Dropdown, DropdownItem } from "flowbite-react"
import { RiExpandUpDownLine } from "@remixicon/react";
import { AccountBank } from "@/shared/types/accounts.types";
import { formatNumberToCurrency } from "@/shared/utils/formatNumberCurrency.utils";
import { useEffect, useState } from "react";

interface DropdownSelectAccountProps {
  accounts: AccountBank[];
}
/**
 * This button component is shown in desktop in the aside bar of the dashboard to select other account.
 * 
 * Caveats: I cannot have the custom element of the prop renderTrigger in a separate component as the dropdown when clicked,
 * it does not trigger the onclick event.
 */
export const DropdownSelectAccount = ({ accounts }: DropdownSelectAccountProps) => {
  const [accountsState, setAccountsState] = useState<AccountBank[]>([])

  useEffect(() => {
    if (accounts.length > 0) {
      setAccountsState(accounts)
    }
  }, [accounts])

  const formattedAccounts = accountsState.map((account) => ({
    name: account.title,
    amount: formatNumberToCurrency(account.amount),
    type: account.accountType
  }))
  const [ firstAccount ] = formattedAccounts;

  return (
    <Dropdown aria-label="Select other account" label="" renderTrigger={() => (
      <article
        className="flex justify-between w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900 focus:ring-2 focus:ring-indigo-200 focus:dark:ring-indigo-700/30 focus:border-indigo-500 focus:dark:border-indigo-700"
        >
        <div className="flex flex-col gap-2 items-start">
          <p className="text-sm">{firstAccount?.name}</p>
          <p className="text-xs text-gray-400">{firstAccount?.amount}</p>
          <span className="bg-blue-100 max-w-min text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
            {firstAccount?.type}
          </span>
        </div>
        <RiExpandUpDownLine className="cursor-pointer" strokeWidth={1} />
      </article>
    )}>
      { formattedAccounts.length > 0 && formattedAccounts.map((acc) => (
          <DropdownItem key={acc.name}>{acc.name}</DropdownItem>
      )) }
    </Dropdown>
  )
}