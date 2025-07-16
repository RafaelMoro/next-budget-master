import { useEffect, useMemo, useState } from "react"
import { CompleteMonthsType, MONTHS } from "../types/global.types"
import { getDateInfo } from "../utils/getDateInfo"

/**
* It's to select month for the dropdown SelectMonthDropdown
*/
export const useSelectMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState<CompleteMonthsType | null>(null)
  const updateSelectMonth = (newMonth: CompleteMonthsType) => setSelectedMonth(newMonth)

  const allMonths: CompleteMonthsType[] = useMemo(() => [...MONTHS], []);

  useEffect(() => {
    const { completeMonth } = getDateInfo()
    setSelectedMonth(completeMonth)
  }, [])

  return {
    selectedMonth,
    allMonths,
    updateSelectMonth
  }
}