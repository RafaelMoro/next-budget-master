import { useQuery } from "@tanstack/react-query"
import { TransactionScreens } from "../types/dashboard.types"
import { getAccountsCb } from "../utils/accounts.utils"

interface UseTransferBankAccountsProps {
  subscreen: TransactionScreens
  accessToken: string
}
export const useTransferBankAccounts = ({ subscreen, accessToken }: UseTransferBankAccountsProps) => {
  const isTransfer = subscreen === 'transfer'
  const { data } = useQuery({
    queryKey: ['accounts'],
    enabled: isTransfer,
    queryFn: () => getAccountsCb(accessToken)
  })

  console.log('data', data)
  return {
    data
  }
}