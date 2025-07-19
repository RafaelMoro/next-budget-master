import { FormEvent, useRef, useState } from "react"
import { DrawerDirection, ExpensePaid } from "../types/records.types"
import { useSelectMonth } from "./useSelectMonth"
import { useSelectYear } from "./useSelectYear"
import { useMediaQuery } from "./useMediaQuery"
import { useQuery } from "@tanstack/react-query"
import { getExpensesByDateCb } from "../utils/records.utils"

interface UseSelectExpensesPaidProps {
  accessToken: string;
  accountId: string | null;
}

export const useSelectExpensesPaid = ({ accessToken, accountId }: UseSelectExpensesPaidProps) => {
  const { selectedMonth, updateSelectMonth, allMonths, selectedAbbreviatedMonth } = useSelectMonth()
  const { selectedYear, updateSelectYear } = useSelectYear()
  const { isMobile } = useMediaQuery()

  const selectedExpenses = useRef<ExpensePaid []>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)

  const drawerDirection: DrawerDirection = isMobile ? 'bottom' : 'right'
  const flag = Boolean(selectedAbbreviatedMonth && selectedYear && accessToken && accountId && isOpen)

  const handleUnselectExpense = (expense: ExpensePaid) => {
    const fileteredExpenses = selectedExpenses.current.filter((e) => e._id !== expense._id)
    selectedExpenses.current = fileteredExpenses
  }
  const handleSelectExpense = (expense: ExpensePaid) => {
    if (selectedExpenses.current.includes(expense)) {
      console.warn('Expense selected already added', expense)
      return
    }
    selectedExpenses.current.push(expense)
  }
  const loadSelectedExpenses = (expenses: ExpensePaid[]) => {
    selectedExpenses.current = expenses
  }

  const { data, refetch } = useQuery({
      queryKey: ['expenses-paid'],
      enabled: flag,
      queryFn: () => getExpensesByDateCb({ month: selectedAbbreviatedMonth ?? 'none', year: selectedYear ?? 'none', accountId: accountId ?? 'none' }, accessToken)
    })
  const expensesFetched = data?.data?.expenses ?? []

  const handleFinishSelection =() => {
    console.log('Selected expenses:', selectedExpenses.current)
    // Here you can handle the selected expenses, e.g., save them or process them further
  }

  const handleSubmitGetExpenses = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    refetch()
  }

  const handleClick = () => {
    handleFinishSelection()
    toggleOpen()
  }

  return {
    openSelectExpensesDrawer: isOpen,
    drawerDirection,
    selectedExpenses,
    selectedMonth,
    selectedYear,
    allMonths,
    expensesFetched,
    isMobile,
    toggleSelectExpensesDrawer: toggleOpen,
    updateSelectMonth,
    updateSelectYear,
    handleUnselectExpense,
    handleSelectExpense,
    handleSubmitGetExpenses,
    handleClick,
    loadSelectedExpenses,
  }
}