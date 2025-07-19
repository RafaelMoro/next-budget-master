import { useEffect, useState } from "react"
import { getDateInfo } from "../utils/getDateInfo"

/**
* It's to select year for the dropdown SelectYearDropdown
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