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

interface SelectExpensesPaidDrawerProps {
  accessToken: string;
  accountId: string | null;
}

export const SelectExpensesPaidDrawer = ({ accessToken, accountId }: SelectExpensesPaidDrawerProps) => {
  const { selectedMonth, updateSelectMonth, allMonths } = useSelectMonth()
  const { selectedYear, updateSelectYear } = useSelectYear()
  const { isMobile } = useMediaQuery()
  const drawerDirection = isMobile ? 'bottom' : 'right'

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)
  const flag = Boolean(selectedMonth && selectedYear && accessToken && accountId)

  const { data, refetch } = useQuery({
    queryKey: ['expenses-paid'],
    enabled: flag,
    queryFn: () => getExpensesByDateCb({ month: selectedMonth ?? 'none', year: selectedYear ?? 'none', accountId: accountId ?? 'none' }, accessToken)
  })
  console.log('data', data)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    refetch()
  }

  return (
    <section className="flex flex-col gap-4 md:mt-6">
      <h4 className="text-xl text-center md:text-start font-semibold">Conecta este pago con tus gastos</h4>
      <p className="text-gray-400">
        Puedes asociar este pago con una o varias transacciones para indicar qué estás pagando.
      </p>
      <Button color="light" className="lg:max-w-max mx-auto" onClick={toggleOpen}>Agregar gastos</Button>
      <Drawer open={isOpen} onClose={toggleOpen} position={drawerDirection}>
        <DrawerHeader title="Agregar gastos" />
        <DrawerItems>
          <form onSubmit={handleSubmit}>
            <SelectMonthDropdown allMonths={allMonths} selectedMonth={selectedMonth} changeSelectedMonth={updateSelectMonth} />
            <SelectYearDropdown selectedYear={selectedYear} changeSelectedYear={updateSelectYear} />
            <Button type="submit" className="max-w-max">Buscar</Button>
          </form>
        </DrawerItems>
      </Drawer>
    </section>
  )
}