import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider"
import { useEffect, useState } from "react"
import { AccountsDisplay } from "../types/accounts.types"
import { saveAccountApi } from "../utils/user-info.utils"
import { fetchRecordsCurrentMonth } from "../lib/dashboard.lib"

interface SelectAccountProps {
  limit10Accounts?: boolean;
  closeModal?: () => void;
}

export const useSelectAccount = ({ limit10Accounts = false, closeModal }: SelectAccountProps) => {
  const { accountsDisplay, selectedAccountDisplay, updateSelectedAccountDisplay, updateRecords } = useDashboardStore(
    (state) => state
  )
  const [accountsOptions, setAccountsOptions] = useState<AccountsDisplay[]>([])
  const hasMore10Accounts = accountsDisplay.length > 10

  useEffect(() => {
    if (selectedAccountDisplay) {
      const options = accountsDisplay
        .filter(acc => acc.accountId !== selectedAccountDisplay.accountId)
        .slice(0, limit10Accounts ? 10 : accountsDisplay.length); // Limit to 10 accounts if specified
      setAccountsOptions(options);
    }
  }, [accountsDisplay, limit10Accounts, selectedAccountDisplay])

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
    if (closeModal) closeModal()
  }

  return {
    accountsOptions,
    selectedAccountDisplay,
    hasMore10Accounts,
    handleSelectAccount
  }
}