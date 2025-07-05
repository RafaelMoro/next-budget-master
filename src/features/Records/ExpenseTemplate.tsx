"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "motion/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useMutation } from "@tanstack/react-query"
import { yupResolver } from "@hookform/resolvers/yup"
import { Toaster, toast } from "sonner";
import { Button, CheckIcon, Label, Spinner, Textarea, TextInput } from "flowbite-react"

import { CreateExpenseData, CreateExpenseDataForm, CreateExpenseError, CreateExpensePayload, CreateExpenseSchema } from "@/shared/types/records.types"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { DEFAULT_AMOUNT_VALUE, useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { useCategoriesForm } from "@/shared/hooks/useCategoriesForm"
import { Category } from "@/shared/types/categories.types"
import { cleanCurrencyString } from "@/shared/utils/formatNumberCurrency.utils"
import { createExpenseCb } from "@/shared/utils/records.utils"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { DetailedError, GeneralError } from "@/shared/types/global.types"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"
import { LinkButton } from "@/shared/ui/atoms/LinkButton"
import { CREATE_EXPENSE_ERROR } from "@/shared/constants/records.constants"
import { CATEGORY_FETCH_ERROR } from "@/shared/constants/categories.constants"
import { TransactionCategorizerDropdown } from "../Categories/TransactionCategorizerDropdown"
import { ManageTagsModal } from "./ManageTagsModal"
import { useManageTags } from "@/shared/hooks/useManageTags"

interface ExpenseTemplateProps {
  categories: Category[]
  selectedAccount: string | null
  accessToken: string
  detailedError: DetailedError | null
}

export const ExpenseTemplate = ({ categories, selectedAccount, accessToken, detailedError }: ExpenseTemplateProps) => {
  const router = useRouter()

  const [date, setDate] = useState<Date | undefined>(new Date())

  const { tags, updateTags, openTagModal, closeModal, openModal } = useManageTags()
  const { handleChange, currencyState, errorAmount, updateErrorAmount } = useCurrencyField({
    amount: null,
  })
  const { categoriesShown, categorySelected, updateCategory, updateSubcategory, subcategories, subcategory,
    categoryError, subcategoryError, updateCategoryError, updateSubcategoryError,
  } = useCategoriesForm({ categories })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateExpenseSchema)
  })

  const { mutate: createExpense, isError, isPending, isSuccess, isIdle, error } = useMutation<CreateExpenseData, CreateExpenseError, CreateExpensePayload>({
    mutationFn: (data) => createExpenseCb(data, accessToken),
    onSuccess: () => {
      setTimeout(() => {
        router.push(DASHBOARD_ROUTE)
      }, 1000)
    }
  })
  const messageError = (error as unknown as GeneralError)?.response?.data?.error?.message

  useEffect(() => {
    if (isError && messageError) {
      toast.error(CREATE_EXPENSE_ERROR);
      return
    }
  }, [isError, messageError])

  useEffect(() => {
    if (detailedError?.cause === 'connection') {
      toast.error('Error de conexión. Por favor, inténtalo más tarde.');
    } else if (detailedError?.message) {
      toast.error(CATEGORY_FETCH_ERROR);
    }
  }, [detailedError?.cause, detailedError?.message])

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

    if (!categoryError && !subcategoryError && !errorAmount && selectedAccount && date && subcategory && !openTagModal) {
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
        tag: tags.current,
        typeOfRecord: 'expense'
      }
      createExpense(payload)
    }
  }

  return (
    <AnimatePresence>
      <form key="expense-template-form" onSubmit={handleSubmit(onSubmit)} className="max-w-3xs mx-auto flex flex-col gap-4">
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
        <TransactionCategorizerDropdown
          categoriesShown={categoriesShown}
          categorySelected={categorySelected}
          updateCategory={updateCategory}
          categoryError={categoryError}
          subcategories={subcategories}
          subcategory={subcategory}
          updateSubcategory={updateSubcategory}
          subcategoryError={subcategoryError}
        />
        <ManageTagsModal tags={tags.current} updateTags={updateTags} openModal={openTagModal} openModalFn={openModal} closeModalFn={closeModal} />
        <LinkButton className="mt-4" type="secondary" href={DASHBOARD_ROUTE} >Cancelar</LinkButton>
          <Button
            className="hover:cursor-pointer"
            disabled={isPending || isSuccess || openTagModal}
            type="submit"
            >
          { (isIdle || isError) && 'Crear gasto'}
          { isPending && (<Spinner aria-label="loading reset password budget master" />) }
          { isSuccess && (<CheckIcon data-testid="check-icon" />)}
        </Button>
      </form>
      { (isError || detailedError?.message) && (
        <Toaster position="top-center" />
      )}
    </AnimatePresence>
  )
}