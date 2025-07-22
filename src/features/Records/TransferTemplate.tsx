"use client"
import { useEffect, useState } from "react"
import { Button, CheckIcon, Label, Spinner, Textarea, TextInput } from "flowbite-react"
import { AnimatePresence } from "motion/react"
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { Toaster, toast } from "sonner";

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
import { CreateIncomeDataForm, CreateTransferPayload, CreateTransferValues, ExpenseDataResponse, IncomeExpenseSchema, TransferErrorResponse } from "@/shared/types/records.types"
import { useTransferBankAccounts } from "@/shared/hooks/useTransferBankAccounts"
import { TransactionScreens } from "@/shared/types/dashboard.types"
import { CATEGORY_FETCH_ERROR, CATEGORY_REQUIRED, SUBCATEGORY_REQUIRED } from "@/shared/constants/categories.constants"
import { CREATE_EXPENSE_INCOME_ERROR, DESTINATION_ACC_REQUIRED } from "@/shared/constants/records.constants"
import { CancelButtonExpenseTemplate } from "./ExpenseTemplate/CancelButtonExpenseTemplate"
import { TransferAccountsSelector } from "./Transfer/TransferAccountsSelector"
import { cleanCurrencyString } from "@/shared/utils/formatNumberCurrency.utils"
import { createTransferCb, getValuesIncomeAndExpense } from "@/shared/utils/records.utils"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { DetailedError, GeneralError } from "@/shared/types/global.types"

interface TransferTemplateProps {
  categories: Category[]
  selectedAccount: string | null
  accessToken: string
  subscreen: TransactionScreens
  detailedErrorCategories: DetailedError | null
}

export const TransferTemplate = ({ categories, selectedAccount, accessToken, subscreen, detailedErrorCategories }: TransferTemplateProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const router = useRouter()
  const { isMobileTablet, isDesktop } = useMediaQuery()
  const { accountsFormatted, isPending: isPendingFetchAcc, origin, destination, destinationAccounts, destinationError,
    updateOrigin, updateDestination, handleDestinationError } = useTransferBankAccounts({ accessToken, subscreen, selectedAccount })

  const { handleChange, currencyState, errorAmount, validateZeroAmount,
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

  const {
    mutate: createTransfer, isError: isErrorCreate, isPending: isPendingCreate, isSuccess: isSuccessCreate, error: errorCreate
  } = useMutation<ExpenseDataResponse, TransferErrorResponse, CreateTransferPayload>({
    mutationFn: (data) => createTransferCb(data, accessToken),
    onSuccess: () => {
      setTimeout(() => {
        router.push(DASHBOARD_ROUTE)
      }, 1000)
    }
  })
  const isPending = isPendingCreate // || isPendingEdit
  const isSuccess = isSuccessCreate // || isSuccessEdit
  const isError = isErrorCreate // || isErrorEdit
  const messageErrorCreate = (errorCreate as unknown as GeneralError)?.response?.data?.error?.message

  // Handle error create transfer
  useEffect(() => {
    if (isError && messageErrorCreate) {
      toast.error(CREATE_EXPENSE_INCOME_ERROR);
      return
    }
  }, [isError, messageErrorCreate])

  // Handle error categories use Effect
    useEffect(() => {
    if (detailedErrorCategories?.cause === 'connection') {
      toast.error('Error de conexión. Por favor, inténtalo más tarde.');
    } else if (detailedErrorCategories?.message) {
      toast.error(CATEGORY_FETCH_ERROR);
    }
  }, [detailedErrorCategories?.cause, detailedErrorCategories?.message])

  const onSubmit: SubmitHandler<CreateIncomeDataForm> = (data) => {
    if (!categorySelected.categoryId || !categorySelected.name) {
      updateCategoryError(CATEGORY_REQUIRED)
    }
    if (!subcategory) {
      updateSubcategoryError(SUBCATEGORY_REQUIRED)
    }
    if (!destination) {
      handleDestinationError(DESTINATION_ACC_REQUIRED)
    }
    validateZeroAmount({ amountState: currencyState })

    if (!categoryError && !subcategoryError && !errorAmount && selectedAccount && date && subcategory && !openTagModal) {
      const amountNumber = cleanCurrencyString(currencyState)
      const payload: CreateTransferValues = {
        amount: amountNumber,
        budgets: [],
        category: categorySelected.categoryId,
        date,
        description: data.description ?? '',
        shortName: data.shortDescription,
        subCategory: subcategory,
        origin: origin?.accountId ?? '',
        destination: destination?.accountId ?? '',
        tag: tags.current,
      }
      const { newValuesExpense, newValuesIncome } = getValuesIncomeAndExpense({ values: payload, expensesSelected: selectedExpenses.current })
      createTransfer({  expense: newValuesExpense, income: newValuesIncome })
    }
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
          <TransferAccountsSelector
            accountsFormatted={accountsFormatted}
            isPending={isPendingFetchAcc}
            origin={origin}
            destination={destination}
            destinationAccounts={destinationAccounts}
            destinationError={destinationError}
            updateOrigin={updateOrigin}
            updateDestination={updateDestination}
          />
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
          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-4">
            <CancelButtonExpenseTemplate action="create" />
            <Button
              className="hover:cursor-pointer"
              disabled={isPending || isSuccess || openTagModal}
              type="submit"
            >
              { isPending ? (
                  <Spinner aria-label="loading create transfer" />
                ) : isSuccess ? (
                  <CheckIcon data-testid="check-icon" />
                ) : 'Crear transferencia' }
            </Button>
          </div>
        </form>
        { (isError || detailedErrorCategories?.message) && (
            <Toaster position="top-center" />
          )}
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