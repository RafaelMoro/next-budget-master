"use client"
import { useState } from "react"
import { AnimatePresence } from "motion/react"
import { Button, Label, Textarea, TextInput } from "flowbite-react"

import { useCategoriesForm } from "@/shared/hooks/useCategoriesForm"
import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { Category } from "@/shared/types/categories.types"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"
import { TransactionCategorizerDropdown } from "../Categories/TransactionCategorizerDropdown"
import { LinkButton } from "@/shared/ui/atoms/LinkButton"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { CreateExpenseDataForm, IncomeExpenseSchema } from "@/shared/types/records.types"
import { CATEGORY_REQUIRED, SUBCATEGORY_REQUIRED } from "@/shared/constants/categories.constants"

interface IncomeTemplateProps {
  categories: Category[]
}

export const IncomeTemplate = ({ categories }: IncomeTemplateProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { handleChange, currencyState, errorAmount,
    validateZeroAmount
  } = useCurrencyField({
    amount: null,
  })
  const { categoriesShown, categorySelected, updateCategory, updateSubcategory, subcategories, subcategory,
    categoryError, subcategoryError,
    updateCategoryError, updateSubcategoryError,
  } = useCategoriesForm({ categories })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(IncomeExpenseSchema)
  })

  const onSubmit: SubmitHandler<CreateExpenseDataForm> = (data) => {
    if (!categorySelected.categoryId || !categorySelected.name) {
      updateCategoryError(CATEGORY_REQUIRED)
    }
    if (!subcategory) {
      updateSubcategoryError(SUBCATEGORY_REQUIRED)
    }
    validateZeroAmount({ amountState: currencyState })

    console.log(data)
  }

  return (
    <div className="w-full flex justify-center gap-32">
      <AnimatePresence>
        <form
          key="income-template-form"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-4 mx-auto flex flex-col gap-4 md:max-w-xl mb-6 lg:mx-0 lg:px-0"
        >
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description">Descripción (opcional)</Label>
            </div>
            <Textarea
              id="description"
              rows={4}
              {...register("description")}
            />
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
          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-4">
            <LinkButton className="mt-4" type="secondary" href={DASHBOARD_ROUTE} >Cancelar</LinkButton>
            <Button
              className="hover:cursor-pointer"
              // disabled={isPending || isSuccess || openTagModal}
              type="submit"
            >
              Crear ingreso
              {/* { (isIdle || isError) && 'Crear ingreso'}
              { isPending && (<Spinner aria-label="loading reset password budget master" />) }
              { isSuccess && (<CheckIcon data-testid="check-icon" />)} */}
            </Button>
          </div>
        </form>
      </AnimatePresence>
    </div>
  )
}