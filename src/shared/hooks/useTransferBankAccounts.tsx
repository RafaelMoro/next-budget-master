import { useQuery } from "@tanstack/react-query"
import { TransactionScreens } from "../types/dashboard.types"
import { getAccountsCb } from "../utils/accounts.utils"
import { useEffect, useState } from "react"
import { AccountTransfer, AccountTypes } from "../types/accounts.types"

interface UseTransferBankAccountsProps {
  subscreen: TransactionScreens
  accessToken: string
  selectedAccount: string | null
}
export const useTransferBankAccounts = ({ subscreen, accessToken, selectedAccount }: UseTransferBankAccountsProps) => {
  const [accountsFormatted, setAccountsFormatted] = useState<AccountTransfer[]>([])
  const [destinationAccounts, setDestinationAccounts] = useState<AccountTransfer[]>([])
  const [origin, setOrigin] = useState<AccountTransfer | null>(null)
  const [destination, setDestination] = useState<AccountTransfer | null>(null)
  const [destinationError, setDestinationError] = useState<string | null>(null)

  const updateDestination = (account: AccountTransfer) => {
    setDestination(account)
  }
  const updateOrigin = (account: AccountTransfer) => {
    setOrigin(account)
    const newDestinationAccounts = accountsFormatted.filter(acc => acc.accountId !== account.accountId)
    setDestinationAccounts(newDestinationAccounts)
    setDestination(null)
    setDestinationError(null)
  }
  const updateEditOrigin = (accountId: string) => {
    const account = accountsFormatted.find(acc => acc.accountId === accountId)
    if (account) {
      setOrigin(account)
      const newDestinationAccounts = accountsFormatted.filter(acc => acc.accountId !== account.accountId)
      setDestinationAccounts(newDestinationAccounts)
      return
    }
    console.warn('Account not found for origin update:', accountId)
  }
  const updateEditDestination = (accountId: string) => {
    const account = accountsFormatted.find(acc => acc.accountId === accountId)
    if (account) {
      setDestination(account)
      setDestinationError(null)
      return
    }
    console.warn('Account not found for destination update:', accountId)
  }

  const handleDestinationError = (error: string) => {
    setDestinationError(error)
  }

  const isTransfer = subscreen === 'transfer'
  const { data, isSuccess, isPending, } = useQuery({
    queryKey: ['accounts'],
    enabled: isTransfer,
    queryFn: () => getAccountsCb(accessToken)
  })

  useEffect(() => {
    if (Boolean(data) && isSuccess) {
      // Format accounts
      const accounts: AccountTransfer[] = data.accounts.map(account => ({
        accountId: account._id,
        name: account.title,
        type: account.accountType as AccountTypes,
      }))
      // Set origin account
      const originAccount: AccountTransfer = accounts.find(acc => acc.accountId === selectedAccount) ?? accounts?.[0]
      setOrigin(originAccount)

      const newDestinationAccounts: AccountTransfer[] = accounts.filter(acc => acc.accountId !== originAccount.accountId)
      setDestinationAccounts(newDestinationAccounts)

      setAccountsFormatted(accounts)
    }
  }, [data, isSuccess, selectedAccount])

  return {
    accountsFormatted,
    isPending,
    origin,
    destination,
    destinationError,
    destinationAccounts,
    updateDestination,
    handleDestinationError,
    updateOrigin,
    updateEditOrigin,
    updateEditDestination
  }
}