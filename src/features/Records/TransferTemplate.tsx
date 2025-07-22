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
import { FurtherDetailsAccordeon } from "./FurtherDetailsAccordeon"
import { ManageTagsModal } from "./ManageTagsModal"
import { SelectPaidSection } from "./ExpensesPaid/SelectPaidSection"
import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { useManageTags } from "@/shared/hooks/useManageTags"
import { useSelectExpensesPaid } from "@/shared/hooks/useSelectExpensesPaid"
import { SelectPaidDrawer } from "./ExpensesPaid/SelectPaidDrawer"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { CreateIncomeDataForm, IncomeExpenseSchema } from "@/shared/types/records.types"
import { useTransferBankAccounts } from "@/shared/hooks/useTransferBankAccounts"
import { TransactionScreens } from "@/shared/types/dashboard.types"

interface TransferTemplateProps {
  categories: Category[]
  selectedAccount: string | null
  accessToken: string
  subscreen: TransactionScreens
}

export const TransferTemplate = ({ categories, selectedAccount, accessToken, subscreen }: TransferTemplateProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { isMobileTablet, isDesktop } = useMediaQuery()
  const { data } = useTransferBankAccounts({ accessToken, subscreen })

  const { handleChange, currencyState, errorAmount, validateZeroAmount, handleEditState: handleEditCurrency,
  } = useCurrencyField({
    amount: null,
  })
  const { categoriesShown, categorySelected, updateCategory, updateSubcategory, subcategories, subcategory,
    categoryError, subcategoryError,
    updateCategoryError, updateSubcategoryError,
  } = useCategoriesForm({ categories })
  const {
    openSelectExpensesDrawer,
    selectedExpenses,
    drawerDirection,
    selectedMonth,
    selectedYear,
    allMonths,
    expensesFetched,
    isMobile,
    toggleSelectExpensesDrawer,
    updateSelectMonth,
    updateSelectYear,
    handleSelectExpense,
    handleUnselectExpense,
    handleSubmitGetExpenses,
    handleClick,
  } = useSelectExpensesPaid({ accessToken, accountId: selectedAccount })
  const { tags, updateTags, openTagModal, closeModal, openModal } = useManageTags()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(IncomeExpenseSchema)
  })

  const onSubmit: SubmitHandler<CreateIncomeDataForm> = (data) => {
    console.log('data', data)
  }

  return (
    <div className="w-full flex justify-center gap-32">
      <AnimatePresence>
        <form
          key="transfer-template-form"
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
          { isMobileTablet && (
            <FurtherDetailsAccordeon>
              <div className="w-full flex flex-col gap-12">
                <ManageTagsModal tags={tags.current} updateTags={updateTags} openModal={openTagModal} openModalFn={openModal} closeModalFn={closeModal} />
                <SelectPaidSection
                  selectedExpenses={selectedExpenses.current}
                  toggleOpen={toggleSelectExpensesDrawer}
                />
              </div>
            </FurtherDetailsAccordeon>
          )}
        </form>
      </AnimatePresence>
      { isDesktop && (
        <aside className="w-full flex flex-col gap-12 max-w-xs">
          <h2 className="text-center text-2xl font-semibold">Más detalles</h2>
          <ManageTagsModal tags={tags.current} updateTags={updateTags} openModal={openTagModal} openModalFn={openModal} closeModalFn={closeModal} />
          <SelectPaidSection
            selectedExpenses={selectedExpenses.current}
            toggleOpen={toggleSelectExpensesDrawer}
          />
        </aside>
      ) }
      <SelectPaidDrawer
        isOpen={openSelectExpensesDrawer}
        isMobile={isMobile}
        drawerDirection={drawerDirection}
        allMonths={allMonths}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        expenses={expensesFetched}
        selectedExpenses={selectedExpenses.current}
        toggleOpen={toggleSelectExpensesDrawer}
        handleSubmit={handleSubmitGetExpenses}
        changeSelectedMonth={updateSelectMonth}
        changeSelectedYear={updateSelectYear}
        handleSelectExpense={handleSelectExpense}
        handleUnselectExpense={handleUnselectExpense}
        handleClick={handleClick}
      />
    </div>
  )
}