import { RiArrowDownSLine } from "@remixicon/react"
import { Button, Dropdown, DropdownItem } from "flowbite-react"
import { getDateInfo } from "@/shared/utils/getDateInfo";

interface SelectYearDropdownProps {
  selectedYear: string | null
  changeSelectedYear: (newYear: string) => void
}

export const SelectYearDropdown = ({ selectedYear, changeSelectedYear: changeSelectedYear }: SelectYearDropdownProps ) => {
  const { years } = getDateInfo()

  return (
    <Dropdown label="" renderTrigger={() => (
      <Button data-testid="select-month-dropdown-button" color="light">
        { selectedYear ? selectedYear : 'Año:' }
        <RiArrowDownSLine />
      </Button>
    )}>
      { years.map((year, index) => (
        <DropdownItem
          onClick={() => changeSelectedYear(year)}
          value={year}
          key={`${year}-${index}`}
        >{year}</DropdownItem>
      ))}
    </Dropdown>
  )
}