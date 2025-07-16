import { useEffect, useState } from "react"
import { CompleteMonthsType, MONTHS } from "../types/global.types"

/**
* It's to select month for the dropdown SelectMonthDropdown
*/
export const useSelectMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState<CompleteMonthsType | null>(null)
  const updateSelectMonth = (newMonth: CompleteMonthsType) => setSelectedMonth(newMonth)

  useEffect(() => {
    const monthNames: CompleteMonthsType[] = [...MONTHS]
    const currentMonth = new Date().getMonth()
    setSelectedMonth(monthNames[currentMonth])
  }, [])

  return {
    selectedMonth,
    updateSelectMonth
  }
}