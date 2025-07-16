import { useRef } from "react"
import { BankMovement } from "../types/records.types"

export const useSelectExpensesPaid = () => {
  const selectedExpenses = useRef<BankMovement []>([])
  const handleUnselectExpense = (expense: BankMovement) => {
    const fileteredExpenses = selectedExpenses.current.filter((e) => e._id !== expense._id)
    selectedExpenses.current = fileteredExpenses
  }
  const handleSelectExpense = (expense: BankMovement) => {
    if (selectedExpenses.current.includes(expense)) {
      console.warn('Expense selected already added', expense)
      return
    }
    selectedExpenses.current.push(expense)
  }

  return {
    selectedExpenses,
    handleUnselectExpense,
    handleSelectExpense
  }
}