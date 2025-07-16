import { useEffect, useState } from "react"
import { getDateInfo } from "../utils/getDateInfo"

/**
* It's to select month for the dropdown SelectMonthDropdown
*/
export const useSelectYear = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const updateSelectYear = (newYear: string) => setSelectedYear(newYear)

  useEffect(() => {
    const { year } = getDateInfo()
    setSelectedYear(year)
  }, [])

  return {
    selectedYear,
    updateSelectYear
  }
}