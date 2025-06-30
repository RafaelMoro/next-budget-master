"use client"
import { useEffect, useState } from "react";
import { Dropdown, DropdownItem } from "flowbite-react"
import { RiExpandUpDownLine } from "@remixicon/react";

import { AccountsDisplay } from "@/shared/types/accounts.types";
import { saveAccountApi } from "@/shared/utils/user-info.utils";
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider";
import { fetchRecordsCurrentMonth } from "@/shared/lib/dashboard.lib";

interface DropdownSelectAccountProps {
  cssClass?: string;
  goAccounts: () => void
}
/**
 * Component Description:
 * For desktop, This button component is shown in the aside bar of the dashboard to select other account.
 * For mobile, it's shown in the drawer menu of the header
 * 
 * Caveats: I cannot have the custom element of the prop renderTrigger in a separate component as the dropdown when clicked,
 * it does not trigger the onclick event.
 */
export const DropdownSelectAccount = ({ cssClass, goAccounts }: DropdownSelectAccountProps) => {
  const { accountsDisplay, selectedAccountDisplay, updateSelectedAccountDisplay, updateRecords } = useDashboardStore(
    (state) => state
  )
  const [accountsOptions, setAccountsOptions] = useState<AccountsDisplay[]>([])

  useEffect(() => {
    if (selectedAccountDisplay) {
      const options = accountsDisplay
        .filter(acc => acc.accountId !== selectedAccountDisplay.accountId)
        .slice(0, 10);
      setAccountsOptions(options);
    }
  }, [accountsDisplay, selectedAccountDisplay])

  const handleSelectAccount = async (accountId: string) => {
    const selected = accountsOptions.find(acc => acc.accountId === accountId)
    if (!selected) {
      console.warn('Account not found in options:', accountId);
      return;
    }
    const newOptions = accountsDisplay.filter(acc => acc.accountId !== accountId)
    // Save the account selected into the cookie
    await saveAccountApi(selected.accountId)
    setAccountsOptions(newOptions)
    updateSelectedAccountDisplay(selected)

    // Fetch new records of the selected account
    const { records } = await fetchRecordsCurrentMonth({ accountId: selected.accountId });
    updateRecords(records);
  }

  return (
    <div className={cssClass && cssClass}>
      <Dropdown aria-label="Select other account" label="" renderTrigger={() => (
        <article
          className="flex justify-between w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900 focus:ring-2 focus:ring-indigo-200 focus:dark:ring-indigo-700/30 focus:border-indigo-500 focus:dark:border-indigo-700"
          >
          <div className="flex flex-col gap-2 items-start">
            <p className="text-sm">{selectedAccountDisplay?.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">{selectedAccountDisplay?.amount}</p>
            <span className="bg-blue-100 max-w-min text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
              {selectedAccountDisplay?.type}
            </span>
          </div>
          <RiExpandUpDownLine data-testid="dropdown-icon" className="cursor-pointer" strokeWidth={1} />
        </article>
      )}>
        { accountsOptions.length > 0 && accountsOptions.map((acc) => (
            <DropdownItem data-testid={`option-${acc.accountId}`} className="flex justify-between" onClick={() => handleSelectAccount(acc.accountId)} key={acc.accountId}>
              <div className="flex flex-col gap-1 items-start">
                <span>{acc.name}</span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{acc.type}</span>
              </div>
              <span>{acc.amount}</span>
            </DropdownItem>
        )) }
        { accountsDisplay.length > 10 && (
          <DropdownItem className="flex justify-between" onClick={goAccounts}>
              Ver todas las cuentas
            </DropdownItem>
        ) }
      </Dropdown>
    </div>
  )
}