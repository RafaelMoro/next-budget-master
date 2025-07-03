"use client"
import { useState } from "react"
import { Button, CheckIcon, Dropdown, DropdownItem, Label, Spinner, Textarea, TextInput } from "flowbite-react"
import { RiArrowDownSLine } from "@remixicon/react"
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form"
import { AnimatePresence } from "motion/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'

import { TransactionManagerGroupButton } from "./TransactionManagerGroupButton"
import { TransactionScreens } from "@/shared/types/dashboard.types"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { Header } from "@/shared/ui/organisms/Header"
import { DEFAULT_AMOUNT_VALUE, useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { Category } from "@/shared/types/categories.types"
import { useCategoriesForm } from "@/shared/hooks/useCategoriesForm"
import { LinkButton } from "@/shared/ui/atoms/LinkButton"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { CreateExpenseData, CreateExpenseDataForm, CreateExpenseError, CreateExpensePayload, CreateExpenseSchema } from "@/shared/types/records.types"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage";
import { createExpenseCb } from "@/shared/utils/records.utils";
import { cleanCurrencyString } from "@/shared/utils/formatNumberCurrency.utils";

interface TransactionManagerProps {
  categories: Category[]
  selectedAccount: string | null
  accessToken: string
}

export const TransactionManager = ({ categories, selectedAccount, accessToken }: TransactionManagerProps) => {
  const router = useRouter()
  const [subscreen, setSubscreen] = useState<TransactionScreens>('expense')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const updateExpenseScreen = () => setSubscreen('expense')
  const updateIncomeScreen = () => setSubscreen('income')
  const updateTransferScreen = () => setSubscreen('transfer')

  const { handleChange, currencyState, errorAmount, updateErrorAmount } = useCurrencyField({
    amount: null,
  })
  const { categoriesShown, categorySelected, updateCategory, updateSubcategory, subcategories, subcategory,
    categoryError, subcategoryError, updateCategoryError, updateSubcategoryError,
  } = useCategoriesForm({ categories })

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

  const { mutate: createExpense, isError, isPending, isSuccess, isIdle } = useMutation<CreateExpenseData, CreateExpenseError, CreateExpensePayload>({
      mutationFn: (data) => createExpenseCb(data, accessToken),
      // onError: () => {
      //   toggleMessageCardState("error")
      // },
      onSuccess: () => {
        setTimeout(() => {
          router.push(DASHBOARD_ROUTE)
        }, 1000)
      }
    })

  const onSubmit: SubmitHandler<CreateExpenseDataForm> = (data) => {
    if (!categorySelected.categoryId || !categorySelected.name) {
      updateCategoryError('Por favor, seleccione una categoría.')
    }
    if (!subcategory) {
      updateSubcategoryError('Por favor, seleccione una subcategoría.')
    }
    if (currencyState === DEFAULT_AMOUNT_VALUE) {
      updateErrorAmount('Por favor, ingrese una cantidad mayor a 0.')
    }
    if (!selectedAccount) {
      // Show error
      console.error('No account selected')
    }
    if (!date) {
      console.error('Date is undefined')
    }

    if (!categoryError && !subcategoryError && !errorAmount && selectedAccount && date && subcategory) {
      const amountNumber = cleanCurrencyString(currencyState)
      const payload: CreateExpensePayload = {
        account: selectedAccount,
        amount: amountNumber,
        // Prop budgets deprecated
        budgets: [],
        category: categorySelected.categoryId,
        date,
        description: data.description ?? '',
        // TODO: Add logic to handle indebted people
        indebtedPeople: [],
        // TODO: Add logic to check if account is type credit
        isPaid: false,
        // TODO: Add logic to handle linked budgets
        linkedBudgets: [],
        shortName: data.shortDescription,
        subCategory: subcategory,
        // TODO: Add logic to handle tags
        tag: [],
        typeOfRecord: 'expense'
      }
      createExpense(payload)
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
                disabled={isPending || isSuccess}
                type="submit"
                >
              { (isIdle || isError) && 'Crear gasto'}
              { isPending && (<Spinner aria-label="loading reset password budget master" />) }
              { isSuccess && (<CheckIcon />)}
            </Button>
          </form>
        </AnimatePresence>
      </main>
    </div>

  )
}