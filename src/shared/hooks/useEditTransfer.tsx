import { useMutation } from "@tanstack/react-query"
import { BankMovement, CreateTransferValues, EditTransferExpensePayload, EditTransferIncomePayload, ExpenseDataResponse, ExpenseErrorResponse, ExpensePaid, IncomeDataResponse, IncomeErrorResponse } from "../types/records.types"
import { cleanCurrencyString } from "../utils/formatNumberCurrency.utils"
import { editExpenseTransferCb, editIncomeTransferCb } from "../utils/records.utils"

interface UseEditTransferProps {
  accessToken: string
  editRecord: BankMovement | null
}

export const useEditTransfer = ({ editRecord, accessToken, }: UseEditTransferProps) => {
  const {
    mutate: editExpense, isError: isErrorEditExpense, isSuccess: isSuccessEditExpense, error: errorEditExpense
  } = useMutation<ExpenseDataResponse, ExpenseErrorResponse, EditTransferExpensePayload>({
    mutationFn: (data) => editExpenseTransferCb(data, accessToken),
  })
  const {
    mutate: editIncome, isError: isErrorEditIncome, isSuccess: isSuccessEditIncome, error: errorEditIncome
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
    editTransfer
  }
}