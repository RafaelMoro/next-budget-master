"use client"

import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { useSelectMonth } from "@/shared/hooks/useSelectMonth"
import { useSelectYear } from "@/shared/hooks/useSelectYear"
import { SelectMonthDropdown } from "@/shared/ui/atoms/SelectMonthDropdown"
import { SelectYearDropdown } from "@/shared/ui/atoms/SelectYearDropdown"
import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react"
import { useState } from "react"

export const SelectExpensesPaidDrawer = () => {
  const { selectedMonth, updateSelectMonth, allMonths } = useSelectMonth()
  const { selectedYear, updateSelectYear } = useSelectYear()
  const { isMobile } = useMediaQuery()
  const drawerDirection = isMobile ? 'bottom' : 'right'

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)

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
          <form>
            <SelectMonthDropdown allMonths={allMonths} selectedMonth={selectedMonth} changeSelectedMonth={updateSelectMonth} />
            <SelectYearDropdown selectedYear={selectedYear} changeSelectedYear={updateSelectYear} />
          </form>
        </DrawerItems>
      </Drawer>
    </section>
  )
}