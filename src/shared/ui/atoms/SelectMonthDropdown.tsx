import { useMemo } from "react";
import { RiArrowDownSLine } from "@remixicon/react"
import { Button, Dropdown, DropdownItem } from "flowbite-react"
import { CompleteMonthsType, MONTHS } from "@/shared/types/global.types";

interface SelectMonthDropdownProps {
  selectedMonth: CompleteMonthsType | null
  changeSelectedMonth: (newMonth: CompleteMonthsType) => void
}

export const SelectMonthDropdown = ({ selectedMonth, changeSelectedMonth }: SelectMonthDropdownProps) => {
  const allMonths: CompleteMonthsType[] = useMemo(() => [...MONTHS], []);
  
  const handleSelectAccountType = (newMonth: CompleteMonthsType) => {
    changeSelectedMonth(newMonth)
  }

  return (
    <Dropdown label="" renderTrigger={() => (
      <Button data-testid="select-month-dropdown-button" color="light">
        { selectedMonth ? selectedMonth : 'Mes:' }
        <RiArrowDownSLine />
      </Button>
    )}>
      { allMonths.map((month, index) => (
        <DropdownItem
          onClick={() => handleSelectAccountType(month)}
          value={month}
          key={`${month}-${index}`}
        >{month}</DropdownItem>
      ))}
    </Dropdown>
  )
}