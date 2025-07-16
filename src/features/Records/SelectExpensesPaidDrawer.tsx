"use client"
import { FormEvent, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react"

import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { useSelectMonth } from "@/shared/hooks/useSelectMonth"
import { useSelectYear } from "@/shared/hooks/useSelectYear"
import { SelectMonthDropdown } from "@/shared/ui/atoms/SelectMonthDropdown"
import { SelectYearDropdown } from "@/shared/ui/atoms/SelectYearDropdown"
import { getExpensesByDateCb } from "@/shared/utils/records.utils"
import { ExpensesPaidTable } from "./ExpensesPaid/ExpensesPaidTable"
import { BankMovement } from "@/shared/types/records.types"

interface SelectExpensesPaidDrawerProps {
  accessToken: string;
  accountId: string | null;
  handleUnselectExpense: (expense: BankMovement) => void
  handleSelectExpense: (expense: BankMovement) => void
  handleFinishSelection: () => void
}

export const SelectExpensesPaidDrawer = ({
  accessToken, accountId, handleSelectExpense, handleUnselectExpense, handleFinishSelection,
}: SelectExpensesPaidDrawerProps) => {
  const { selectedMonth, updateSelectMonth, allMonths, selectedAbbreviatedMonth } = useSelectMonth()
  const { selectedYear, updateSelectYear } = useSelectYear()
  const { isMobile } = useMediaQuery()
  const drawerDirection = isMobile ? 'bottom' : 'right'

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)
  const flag = Boolean(selectedAbbreviatedMonth && selectedYear && accessToken && accountId)

  const { data, refetch } = useQuery({
    queryKey: ['expenses-paid'],
    enabled: flag,
    queryFn: () => getExpensesByDateCb({ month: selectedAbbreviatedMonth ?? 'none', year: selectedYear ?? 'none', accountId: accountId ?? 'none' }, accessToken)
  })
  const expenses = data?.data?.expenses ?? []
  console.log('expenses', expenses)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    refetch()
  }

  const handleClick = () => {
    handleFinishSelection()
    toggleOpen()
  }

  return (
    <section className="flex flex-col gap-4 md:mt-6">
      <h4 className="text-xl text-center md:text-start font-semibold">Conecta este pago con tus gastos</h4>
      <p className="text-gray-400">
        Puedes asociar este pago con una o varias transacciones para indicar qué estás pagando.
      </p>
      <Button color="light" className="lg:max-w-max mx-auto" onClick={toggleOpen}>Agregar gastos</Button>
      <Drawer className="w-max" open={isOpen} onClose={toggleOpen} position={drawerDirection}>
        <DrawerHeader title="Agregar gastos" />
        <DrawerItems>
          <div className="flex flex-col gap-5">
            <form className="flex justify-center gap-3" onSubmit={handleSubmit}>
              <SelectMonthDropdown allMonths={allMonths} selectedMonth={selectedMonth} changeSelectedMonth={updateSelectMonth} />
              <SelectYearDropdown selectedYear={selectedYear} changeSelectedYear={updateSelectYear} />
              <Button type="submit" className="max-w-max" outline>Buscar</Button>
            </form>
            <ExpensesPaidTable
              expenses={expenses}
              handleSelectExpense={handleSelectExpense}
              handleUnselectExpense={handleUnselectExpense}
            />
            <Button onClick={handleClick}>Terminar</Button>
          </div>
        </DrawerItems>
      </Drawer>
    </section>
  )
}