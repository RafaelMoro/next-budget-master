"use client"
import { useState } from "react"

import { TransactionManagerGroupButton } from "./TransactionManagerGroupButton"
import { TransactionScreens } from "@/shared/types/dashboard.types"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { Header } from "@/shared/ui/organisms/Header"
import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { Button, Dropdown, DropdownItem, Label, Textarea, TextInput } from "flowbite-react"
import { Category } from "@/shared/types/categories.types"
import { RiArrowDownSLine } from "@remixicon/react"

interface TransactionManagerProps {
  categories: Category[]
}

export const TransactionManager = ({ categories }: TransactionManagerProps) => {
  const [subscreen, setSubscreen] = useState<TransactionScreens>('expense')
  const updateExpenseScreen = () => setSubscreen('expense')
  const updateIncomeScreen = () => setSubscreen('income')
  const updateTransferScreen = () => setSubscreen('transfer')

  const categoriesShown = categories.map((cat) => ({
    name: cat.categoryName,
    categoryId: cat._id
  }))
  const [categorySelected, setCategorySelected] = useState({
    name: '',
    categoryId: ''
  })
  const [subcategory, setSubcategory] = useState<string | null>(null)
  const subcategories = categories.find(cat => cat._id === categorySelected.categoryId)?.subCategories ?? []

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
          <Dropdown aria-label="Select category" label="Categorias" renderTrigger={() => (
            <Button color="dark">
              Categoria: {categorySelected.name}
              <RiArrowDownSLine />
            </Button>
          )}>
            { categoriesShown.map((cat) => (
              <DropdownItem key={cat.categoryId} value={cat.categoryId} onClick={() => setCategorySelected(cat) } className="flex justify-between">
                {cat.name}
              </DropdownItem>
            )) }
          </Dropdown>
          <Dropdown disabled={subcategories.length === 0} aria-label="Select subcategory" label="Subcategorias" renderTrigger={() => (
            <Button color="dark">
              Subcategoria: {subcategory}
              <RiArrowDownSLine />
            </Button>
          )}>
            { (subcategories.length > 0) && subcategories.map((subcat) => (
              <DropdownItem key={subcat} onClick={() => setSubcategory(subcat)} className="flex justify-between">
                {subcat}
              </DropdownItem>
            )) }
          </Dropdown>
        </form>
      </main>
    </div>

  )
}