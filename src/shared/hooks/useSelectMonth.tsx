import { useState } from "react"
import { CompleteMonthsType } from "../types/global.types"

/**
* It's to select month for the dropdown SelectMonthDropdown
*/
export const useSelectMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState<CompleteMonthsType>('Enero')
  const updateSelectMonth = (newMonth: CompleteMonthsType) => setSelectedMonth(newMonth)

  return {
    selectedMonth,
    updateSelectMonth
  }
}