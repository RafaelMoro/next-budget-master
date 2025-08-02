"use client"
import { Button } from "flowbite-react"

import { ExpensePaid } from "@/shared/types/records.types"

interface SelectExpensesPaidDrawerProps {
  selectedExpenses: ExpensePaid[]
  totalSelectedExpenses: string
  toggleOpen: () => void;
}

export const SelectPaidSection = ({
  selectedExpenses, totalSelectedExpenses, toggleOpen,
}: SelectExpensesPaidDrawerProps) => {
  const buttonText = selectedExpenses.length > 0 ? 'Administrar gastos': 'Agregar gastos'

  return (
    <section className="flex flex-col gap-4 md:mt-6">
      <h4 className="text-xl text-center md:text-start font-semibold">Conecta este pago con tus gastos</h4>
      <p className="text-gray-400">
        Puedes asociar este pago con una o varias transacciones para indicar qué estás pagando.
      </p>
      { selectedExpenses.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-gray-400">Gastos seleccionados: {selectedExpenses.length}</p>
          <p className="text-gray-400">Total: {totalSelectedExpenses}</p>
        </div>
        ) }
      <Button color="light" className="lg:max-w-max mx-auto" onClick={toggleOpen}>{buttonText}</Button>
    </section>
  )
}