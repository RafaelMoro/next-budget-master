"use client"
import { useState } from "react"
import { Label, Textarea, TextInput } from "flowbite-react"
import { AnimatePresence } from "motion/react"

import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"
import { TransactionCategorizerDropdown } from "../Categories/TransactionCategorizerDropdown"
import { useCategoriesForm } from "@/shared/hooks/useCategoriesForm"
import { Category } from "@/shared/types/categories.types"

interface TransferTemplateProps {
  categories: Category[]
}

export const TransferTemplate = ({ categories }: TransferTemplateProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const { handleChange, currencyState, errorAmount, validateZeroAmount, handleEditState: handleEditCurrency,
  } = useCurrencyField({
    amount: null,
  })
  const { categoriesShown, categorySelected, updateCategory, updateSubcategory, subcategories, subcategory,
      categoryError, subcategoryError,
      updateCategoryError, updateSubcategoryError,
    } = useCategoriesForm({ categories })

  return (
    <div className="w-full flex justify-center gap-32">
      <AnimatePresence>
        <form
          key="transfer-template-form"
          // onSubmit={handleSubmit(onSubmit)}
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
              // {...register("shortDescription")}
              />
            {/* { errors?.shortDescription?.message && (
              <ErrorMessage isAnimated>{errors.shortDescription?.message}</ErrorMessage>
            )} */}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="description">Descripción (opcional)</Label>
            </div>
            <Textarea
              id="description"
              rows={4}
              // {...register("description")}
            />
            {/* { errors?.description?.message && (
              <ErrorMessage isAnimated>{errors.description?.message}</ErrorMessage>
            )} */}
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
        </form>
      </AnimatePresence>
    </div>
  )
}