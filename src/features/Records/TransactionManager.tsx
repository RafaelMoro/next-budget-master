"use client"
import { useState } from "react"

import { TransactionManagerGroupButton } from "./TransactionManagerGroupButton"
import { TransactionScreens } from "@/shared/types/dashboard.types"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { Header } from "@/shared/ui/organisms/Header"
import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { Dropdown, DropdownItem, Label, Textarea, TextInput } from "flowbite-react"
import { Category } from "@/shared/types/categories.types"

interface TransactionManagerProps {
  categories: Category[]
}

export const TransactionManager = ({ categories }: TransactionManagerProps) => {
  console.log('categories', categories)
  const [subscreen, setSubscreen] = useState<TransactionScreens>('expense')
  const updateExpenseScreen = () => setSubscreen('expense')
  const updateIncomeScreen = () => setSubscreen('income')
  const updateTransferScreen = () => setSubscreen('transfer')

  const { handleChange, currencyState } = useCurrencyField({
    amount: null
  })

  const titleDictionary: Record<TransactionScreens, string> = {
    expense: 'Gasto',
    income: 'Ingreso',
    transfer: 'Transferencia',
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center gap-8 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Crear {titleDictionary[subscreen]}</h1>
        <TransactionManagerGroupButton
          screen={subscreen}
          updateExpenseScreen={updateExpenseScreen}
          updateIncomeScreen={updateIncomeScreen}
          updateTransferScreen={updateTransferScreen}
        />
        <form className="max-w-3xs mx-auto flex flex-col gap-4">
          <DateTimePicker />
          <CurrencyField
            labelName="Cantidad"
            dataTestId="amount"
            fieldId="amount"
            value={currencyState}
            handleChange={handleChange}
          />
          <div>
            <div className="mb-2 block">
              <Label htmlFor="shortDescription">Pequeña descripción</Label>
            </div>
            <TextInput
              data-testid="shortDescription"
              id="shortDescription"
              type="text"
              // {...register("title")}
              />
            {/* { errors?.title?.message && (
              <ErrorMessage isAnimated>{errors.title?.message}</ErrorMessage>
            )} */}
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="description">Descripción (opcional)</Label>
            </div>
            <Textarea id="description" required rows={4} />
          </div>
          <Dropdown aria-label="Select other account" label="Categorias">
            <DropdownItem className="flex justify-between">
              Una categoria
            </DropdownItem>
          </Dropdown>
          <Dropdown aria-label="Select other account" label="Subcategorias">
            <DropdownItem className="flex justify-between">
              Una categoria
            </DropdownItem>
          </Dropdown>
        </form>
      </main>
    </div>

  )
}