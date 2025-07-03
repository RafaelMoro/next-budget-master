"use client"
import { useState } from "react"
import { Button, Dropdown, DropdownItem, Label, Textarea, TextInput } from "flowbite-react"
import { RiArrowDownSLine } from "@remixicon/react"
import { yupResolver } from "@hookform/resolvers/yup";

import { TransactionManagerGroupButton } from "./TransactionManagerGroupButton"
import { TransactionScreens } from "@/shared/types/dashboard.types"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { Header } from "@/shared/ui/organisms/Header"
import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { Category } from "@/shared/types/categories.types"
import { useCategoriesForm } from "@/shared/hooks/useCategoriesForm"
import { LinkButton } from "@/shared/ui/atoms/LinkButton"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { SubmitHandler, useForm } from "react-hook-form"
import { CreateExpenseData, CreateExpenseSchema } from "@/shared/types/records.types"
import { AnimatePresence } from "motion/react";
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage";

interface TransactionManagerProps {
  categories: Category[]
}

export const TransactionManager = ({ categories }: TransactionManagerProps) => {
  const [subscreen, setSubscreen] = useState<TransactionScreens>('expense')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const updateExpenseScreen = () => setSubscreen('expense')
  const updateIncomeScreen = () => setSubscreen('income')
  const updateTransferScreen = () => setSubscreen('transfer')

  const [errorAmount, setErrorAmount] = useState<string | null>(null)
  const [categoryError, setCategoryError] = useState<string | null>(null)
  const resetCategoryError = () => setCategoryError(null)
  const [subcategoryError, setSubcategoryError] = useState<string | null>(null)

  const { handleChange, currencyState } = useCurrencyField({
    amount: null
  })
  const { categoriesShown, categorySelected, updateCategory, updateSubcategory, subcategories, subcategory } = useCategoriesForm({ categories, categoryError, resetCategoryError })

  const titleDictionary: Record<TransactionScreens, string> = {
    expense: 'Gasto',
    income: 'Ingreso',
    transfer: 'Transferencia',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateExpenseSchema)
  })

  const onSubmit: SubmitHandler<CreateExpenseData> = (data) => {
    console.log(data)
    if (!categorySelected.categoryId || !categorySelected.name) {
      setCategoryError('Por favor, seleccione una categoría.')
    }
    if (!subcategory) {
      setSubcategoryError('Por favor, seleccione una subcategoría.')
    }
    if (currencyState === '$0.00') {
      setErrorAmount('Por favor, ingrese una cantidad mayor a 0.')
    }
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
        <AnimatePresence>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xs mx-auto flex flex-col gap-4">
            <DateTimePicker date={date} setDate={setDate} />
            <CurrencyField
              labelName="Cantidad"
              dataTestId="amount"
              fieldId="amount"
              value={currencyState}
              handleChange={handleChange}
            />
            { errorAmount && (
              <ErrorMessage isAnimated>{errorAmount}</ErrorMessage>
            )}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="shortDescription">Pequeña descripción</Label>
              </div>
              <TextInput
                data-testid="shortDescription"
                id="shortDescription"
                type="text"
                {...register("shortDescription")}
                />
              { errors?.shortDescription?.message && (
                <ErrorMessage isAnimated>{errors.shortDescription?.message}</ErrorMessage>
              )}
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="description">Descripción (opcional)</Label>
              </div>
              <Textarea id="description" rows={4} {...register("description")} />
              { errors?.description?.message && (
                <ErrorMessage isAnimated>{errors.description?.message}</ErrorMessage>
              )}
            </div>
            <Dropdown aria-label="Select category" label="Categorias" renderTrigger={() => (
              <Button color="dark">
                Categoria: {categorySelected.name}
                <RiArrowDownSLine />
              </Button>
            )}>
              { categoriesShown.map((cat) => (
                <DropdownItem key={cat.categoryId} value={cat.categoryId} onClick={() => updateCategory(cat) } className="flex justify-between">
                  {cat.name}
                </DropdownItem>
              )) }
            </Dropdown>
            { categoryError && (
              <ErrorMessage isAnimated>{categoryError}</ErrorMessage>
            )}
            <Dropdown disabled={subcategories.length === 0} aria-label="Select subcategory" label="Subcategorias" renderTrigger={() => (
              <Button color="dark">
                Subcategoria: {subcategory}
                <RiArrowDownSLine />
              </Button>
            )}>
              { (subcategories.length > 0) && subcategories.map((subcat) => (
                <DropdownItem key={subcat} onClick={() => updateSubcategory(subcat)} className="flex justify-between">
                  {subcat}
                </DropdownItem>
              )) }
            </Dropdown>
            { subcategoryError && (
              <ErrorMessage isAnimated>{subcategoryError}</ErrorMessage>
            )}
            <LinkButton className="mt-4" text="Cancelar" type="secondary" href={DASHBOARD_ROUTE} />
              <Button
                className="hover:cursor-pointer"
                // disabled={isPending || isSuccess}
                type="submit"
                >
                  Crear gasto
              {/* { (isIdle || isError) && 'Crear gasto'}
              { isPending && (<Spinner aria-label="loading reset password budget master" />) }
              { isSuccess && (<CheckIcon />)} */}
            </Button>
          </form>
        </AnimatePresence>
      </main>
    </div>

  )
}