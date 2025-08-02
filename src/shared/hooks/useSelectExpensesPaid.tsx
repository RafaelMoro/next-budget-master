import { FormEvent, useState } from "react"
import { DrawerDirection, ExpensePaid } from "../types/records.types"
import { useSelectMonth } from "./useSelectMonth"
import { useSelectYear } from "./useSelectYear"
import { useMediaQuery } from "./useMediaQuery"
import { useQuery } from "@tanstack/react-query"
import { getExpensesByDateCb } from "../utils/records.utils"
import { formatNumberToCurrency } from "../utils/formatNumberCurrency.utils"
import { DEFAULT_AMOUNT_VALUE } from "../constants/Global.constants"

interface UseSelectExpensesPaidProps {
  accessToken: string;
  accountId: string | null;
}

export const useSelectExpensesPaid = ({ accessToken, accountId }: UseSelectExpensesPaidProps) => {
  const { selectedMonth, updateSelectMonth, allMonths, selectedAbbreviatedMonth } = useSelectMonth({ isOlderRecords: false })
  const { selectedYear, updateSelectYear } = useSelectYear({ isOlderRecords: false })
  const { isMobile } = useMediaQuery()

  const [selectedExpenses, setSelectedExpenses] = useState<ExpensePaid []>([])
  const [totalSelectedExpenses, setTotalSelectedExpenses] = useState<string>(DEFAULT_AMOUNT_VALUE)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)

  const drawerDirection: DrawerDirection = isMobile ? 'bottom' : 'right'
  const flag = Boolean(selectedAbbreviatedMonth && selectedYear && accessToken && accountId && isOpen)

  const handleUnselectExpense = (expense: ExpensePaid) => {
    const fileteredExpenses = selectedExpenses.filter((e) => e._id !== expense._id)
    const totalAmount = fileteredExpenses.reduce((acc, curr) => acc + curr.amount, 0)
    const transformedAmount = formatNumberToCurrency(totalAmount)
    setTotalSelectedExpenses(transformedAmount)
    setSelectedExpenses(fileteredExpenses)
  }
  const handleSelectExpense = (expense: ExpensePaid) => {
    if (selectedExpenses.includes(expense)) {
      console.warn('Expense selected already added', expense)
      return
    }
    const updatedSelectedExpenses = [...selectedExpenses, expense]
    const totalAmount = updatedSelectedExpenses.reduce((acc, curr) => acc + curr.amount, 0)
    const transformedAmount = formatNumberToCurrency(totalAmount)
    setTotalSelectedExpenses(transformedAmount)
    setSelectedExpenses(updatedSelectedExpenses)
  }
  const loadSelectedExpenses = (expenses: ExpensePaid[]) => {
    setSelectedExpenses(expenses)
  }

  const { data, refetch } = useQuery({
    queryKey: ['expenses-paid', accountId],
    enabled: flag,
    queryFn: () => getExpensesByDateCb({ month: selectedAbbreviatedMonth ?? 'none', year: selectedYear ?? 'none', accountId: accountId ?? 'none' }, accessToken)
  })
  const expensesFetched = data?.data?.expenses ?? []

  const handleFinishSelection =() => {
    console.log('Selected expenses:', selectedExpenses)
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
    totalSelectedExpenses,
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