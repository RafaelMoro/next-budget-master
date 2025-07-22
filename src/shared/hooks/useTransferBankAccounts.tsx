import { useQuery } from "@tanstack/react-query"
import { TransactionScreens } from "../types/dashboard.types"
import { getAccountsCb } from "../utils/accounts.utils"
import { useEffect, useState } from "react"
import { AccountTransfer } from "../types/accounts.types"

interface UseTransferBankAccountsProps {
  subscreen: TransactionScreens
  accessToken: string
  selectedAccount: string | null
}
export const useTransferBankAccounts = ({ subscreen, accessToken, selectedAccount }: UseTransferBankAccountsProps) => {
  const [accountsFormatted, setAccountsFormatted] = useState<AccountTransfer[]>([])
  const [origin, setOrigin] = useState<AccountTransfer | null>(null)
  const [destination, setDestination] = useState<AccountTransfer | null>(null)

  const isTransfer = subscreen === 'transfer'
  const { data, isSuccess, isPending, } = useQuery({
    queryKey: ['accounts'],
    enabled: isTransfer,
    queryFn: () => getAccountsCb(accessToken)
  })

  useEffect(() => {
    if (Boolean(data) && isSuccess) {
      const accounts = data.accounts.map(account => ({
        accountId: account._id,
        name: account.title
      }))
      const originAccount: AccountTransfer = accounts.find(acc => acc.accountId === selectedAccount) ?? accounts?.[0]
      setOrigin(originAccount)
      setAccountsFormatted(accounts)
    }
  }, [data, isSuccess, selectedAccount])

  return {
    accountsFormatted,
    isPending,
    origin,
    destination
  }
}