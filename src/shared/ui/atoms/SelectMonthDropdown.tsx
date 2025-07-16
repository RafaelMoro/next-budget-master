import { RiArrowDownSLine } from "@remixicon/react"
import { Button, Dropdown, DropdownItem } from "flowbite-react"
import { CompleteMonthsType } from "@/shared/types/global.types";

interface SelectMonthDropdownProps {
  allMonths: CompleteMonthsType[]
  selectedMonth: CompleteMonthsType | null
  changeSelectedMonth: (newMonth: CompleteMonthsType) => void
}

export const SelectMonthDropdown = ({ allMonths, selectedMonth, changeSelectedMonth }: SelectMonthDropdownProps) => {
  return (
    <Dropdown label="" renderTrigger={() => (
      <Button data-testid="select-month-dropdown-button" color="light">
        { selectedMonth ? selectedMonth : 'Mes:' }
        <RiArrowDownSLine />
      </Button>
    )}>
      { allMonths.map((month, index) => (
        <DropdownItem
          onClick={() => changeSelectedMonth(month)}
          value={month}
          key={`${month}-${index}`}
        >{month}</DropdownItem>
      ))}
    </Dropdown>
  )
}