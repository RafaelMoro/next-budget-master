import { useMemo, useState } from "react";
import { RiArrowDownSLine } from "@remixicon/react"
import { Button, Dropdown, DropdownItem } from "flowbite-react"
import { CompleteMonthsType, MONTHS } from "@/shared/types/global.types";

interface SelectMonthDropdownProps {
  selectedMonth: CompleteMonthsType
  changeSelectedMonth: (newMonth: CompleteMonthsType) => void
}

export const SelectMonthDropdown = ({ selectedMonth, changeSelectedMonth }: SelectMonthDropdownProps) => {
  const allMonths: CompleteMonthsType[] = useMemo(() => [...MONTHS], []);
  const [filteredMonths, setFilteredMonths] = useState<CompleteMonthsType[]>(allMonths)
  
  const handleSelectAccountType = (newMonth: CompleteMonthsType) => {
    changeSelectedMonth(newMonth)
    const filteredMonths = allMonths.filter(month => month !== newMonth)
    setFilteredMonths(filteredMonths)
  }

  return (
    <Dropdown label="" renderTrigger={() => (
      <Button color="dark">
        Mes: {selectedMonth}
        <RiArrowDownSLine />
      </Button>
    )}>
      { filteredMonths.map((month, index) => (
        <DropdownItem
          onClick={() => handleSelectAccountType(month)}
          value={month}
          key={`${month}-${index}`}
        >{month}</DropdownItem>
      ))}
    </Dropdown>
  )
}