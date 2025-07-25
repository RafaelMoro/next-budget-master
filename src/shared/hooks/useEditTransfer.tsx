import { useMutation } from "@tanstack/react-query"
import { useRouter } from 'next/navigation'

import { BankMovement, CreateTransferValues, EditTransferExpensePayload, EditTransferIncomePayload, ExpenseDataResponse, ExpenseErrorResponse, ExpensePaid, IncomeDataResponse, IncomeErrorResponse } from "../types/records.types"
import { cleanCurrencyString } from "../utils/formatNumberCurrency.utils"
import { editExpenseTransferCb, editIncomeTransferCb, resetEditRecordLS } from "../utils/records.utils"
import { DASHBOARD_ROUTE } from "../constants/Global.constants"

interface UseEditTransferProps {
  accessToken: string
  editRecord: BankMovement | null
}

export const useEditTransfer = ({ editRecord, accessToken, }: UseEditTransferProps) => {
  const router = useRouter()
  const {
    mutate: editExpense, isError: isErrorEditExpense, isSuccess: isSuccessEditExpense, error: errorEditExpense, isPending: isPendingEditExpense
  } = useMutation<ExpenseDataResponse, ExpenseErrorResponse, EditTransferExpensePayload>({
    mutationFn: (data) => editExpenseTransferCb(data, accessToken),
  })
  const {
    mutate: editIncome, isError: isErrorEditIncome, isSuccess: isSuccessEditIncome, error: errorEditIncome, isPending: isPendingEditIncome
  } = useMutation<IncomeDataResponse, IncomeErrorResponse, EditTransferIncomePayload>({
    mutationFn: (data) => editIncomeTransferCb(data, accessToken),
  })
  
  const editTransfer = async ({
    payload, currencyState, expensesPaid
  }: {
    payload: CreateTransferValues
    currencyState: string
    expensesPaid: ExpensePaid[]
  }) => {
    try {
      if (!Boolean(editRecord)) {
        console.warn('Edit record is null')
        return
      }

      const amountNumber = cleanCurrencyString(currencyState)
      const isExpense = !editRecord?.expensesPaid;
      const recordIdExpense = isExpense ? (editRecord?._id ?? '') : (editRecord?.transferRecord?.transferId ?? '');
      const recordIdIncome = !isExpense ? (editRecord?._id ?? '') : (editRecord?.transferRecord?.transferId ?? '');
      const incomeAccount = !isExpense ? (editRecord?.account ?? '') : (editRecord?.transferRecord?.account ?? '');
      const expenseAccount = isExpense ? (editRecord?.account ?? '') : (editRecord?.transferRecord?.account ?? '');
  
      const editExpensePayload: EditTransferExpensePayload = {
        account: expenseAccount,
        recordId: recordIdExpense,
        amount: amountNumber,
        budgets: [],
        category: payload.category,
        date: payload.date,
        description: payload.description,
        indebtedPeople: [],
        isPaid: true,
        linkedBudgets: [],
        shortName: payload.shortName,
        subCategory: payload.subCategory,
        tag: payload.tag,
        typeOfRecord: 'transfer'
      }
  
      const editIncomePayload: EditTransferIncomePayload = {
        account: incomeAccount,
        recordId: recordIdIncome,
        amount: amountNumber,
        budgets: [],
        category: payload.category,
        date: payload.date,
        description: payload.description,
        expensesPaid,
        indebtedPeople: [],
        shortName: payload.shortName,
        subCategory: payload.subCategory,
        tag: payload.tag,
        typeOfRecord: 'transfer'
      }
  
      await editExpense(editExpensePayload)
      await editIncome(editIncomePayload)
      resetEditRecordLS()
      router.refresh()

      setTimeout(() => {
        router.push(DASHBOARD_ROUTE)
      }, 1000)

    } catch (error) {
      console.error('Error in editTransfer:', error)
      throw error
    }
  }

  return {
    isErrorEditExpense,
    isSuccessEditExpense,
    errorEditExpense,
    isErrorEditIncome,
    isSuccessEditIncome,
    errorEditIncome,
    isPendingEditExpense,
    isPendingEditIncome,
    editTransfer
  }
}