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
import { Category, CategoryShown } from "@/shared/types/categories.types"
import { FurtherDetailsAccordeon } from "./FurtherDetailsAccordeon"
import { ManageTagsModal } from "./ManageTagsModal"
import { SelectPaidSection } from "./ExpensesPaid/SelectPaidSection"
import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { useManageTags } from "@/shared/hooks/useManageTags"
import { useSelectExpensesPaid } from "@/shared/hooks/useSelectExpensesPaid"
import { SelectPaidDrawer } from "./ExpensesPaid/SelectPaidDrawer"
import { BankMovement, CreateIncomeDataForm, CreateTransferPayload, CreateTransferValues, ExpenseDataResponse, ExpensePaid, IncomeExpenseSchema, TransferErrorResponse } from "@/shared/types/records.types"
import { useTransferBankAccounts } from "@/shared/hooks/useTransferBankAccounts"
import { TransactionScreens } from "@/shared/types/dashboard.types"
import { CATEGORY_FETCH_ERROR, CATEGORY_REQUIRED, SUBCATEGORY_REQUIRED } from "@/shared/constants/categories.constants"
import { CREATE_EXPENSE_INCOME_ERROR, DESTINATION_ACC_REQUIRED } from "@/shared/constants/records.constants"
import { CancelButtonExpenseTemplate } from "./ExpenseTemplate/CancelButtonExpenseTemplate"
import { TransferAccountsSelector } from "./Transfer/TransferAccountsSelector"
import { cleanCurrencyString } from "@/shared/utils/formatNumberCurrency.utils"
import { createTransferCb, getOriginAccountForEdit, getValuesIncomeAndExpense } from "@/shared/utils/records.utils"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { DetailedError, GeneralError } from "@/shared/types/global.types"
import { useEditTransfer } from "@/shared/hooks/useEditTransfer"

interface TransferTemplateProps {
  categories: Category[]
  selectedAccount: string | null
  accessToken: string
  subscreen: TransactionScreens
  detailedErrorCategories: DetailedError | null
  editRecord: BankMovement | null
}

export const TransferTemplate = ({ categories, selectedAccount, accessToken, subscreen, detailedErrorCategories, editRecord }: TransferTemplateProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const buttonText = editRecord?.shortName ? 'Editar transferencia' : 'Crear transferencia'
  const isIncome = Boolean(editRecord?.expensesPaid);
  const showDefaultError = () => {
    toast.error(CREATE_EXPENSE_INCOME_ERROR);
  }

  const router = useRouter()
  const { isMobileTablet, isDesktop } = useMediaQuery()
  const { accountsFormatted, isPending: isPendingFetchAcc, origin, destination, destinationAccounts, destinationError,
    updateOrigin, updateDestination, handleDestinationError, updateEditDestination, updateEditOrigin } = useTransferBankAccounts({ accessToken, subscreen, selectedAccount })
  const { editTransfer, isSuccessEditExpense, isSuccessEditIncome, isPendingEditExpense, isPendingEditIncome, isErrorEditExpense, isErrorEditIncome } = useEditTransfer({ accessToken, editRecord, showDefaultError })

  const { handleChange, currencyState, errorAmount, validateZeroAmount, handleEditState: handleEditCurrency, isZeroCurrency,
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
    totalSelectedExpenses,
    toggleSelectExpensesDrawer,
    updateSelectMonth,
    updateSelectYear,
    handleSelectExpense,
    handleUnselectExpense,
    handleSubmitGetExpenses,
    handleClick,
    loadSelectedExpenses,
  } = useSelectExpensesPaid({ accessToken, accountId: destination?.accountId || null })
  const { tags, updateTags, openTagModal, closeModal, openModal } = useManageTags()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(IncomeExpenseSchema)
  })

  const {
    mutate: createTransfer, isError: isErrorCreate, isPending: isPendingCreate, isSuccess: isSuccessCreate, error: errorCreate
  } = useMutation<ExpenseDataResponse, TransferErrorResponse, CreateTransferPayload>({
    mutationFn: (data) => createTransferCb(data, accessToken),
    onSuccess: () => {
      router.refresh()
      setTimeout(() => {
        router.push(DASHBOARD_ROUTE)
      }, 1000)
    }
  })
  const isPending = isPendingCreate || isPendingEditExpense || isPendingEditIncome
  const isSuccess = isSuccessCreate || (isSuccessEditExpense && isSuccessEditIncome)
  const isError = isErrorCreate || isErrorEditExpense || isErrorEditIncome
  const messageErrorCreate = (errorCreate as unknown as GeneralError)?.response?.data?.error?.message

  // Handle error create transfer
  useEffect(() => {
    if (isError && messageErrorCreate) {
      showDefaultError()
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

  // Load edit record use Effect
  useEffect(() => {
    // Init state to edit expense
    if (editRecord && accountsFormatted.length > 0) {
      const destinationAccount = isIncome ? editRecord.account : editRecord?.transferRecord?.account ?? '';
      const originAccount = getOriginAccountForEdit({
        isIncome, recordToBeEdited: editRecord,
      })
      updateEditOrigin(originAccount)
      updateEditDestination(destinationAccount)
      setValue('shortDescription', editRecord?.shortName)
      setValue('description', editRecord?.description)
      setDate(new Date(editRecord.date))
      handleEditCurrency(editRecord.amountFormatted)
      updateSubcategory(editRecord.subCategory)
      updateTags(editRecord.tag)
      if (editRecord?.expensesPaid && editRecord?.expensesPaid?.length > 0) {
        loadSelectedExpenses(editRecord.expensesPaid as ExpensePaid[])
      }

      if (editRecord.category) {
        const cat: CategoryShown = {
          name: editRecord.category.categoryName,
          categoryId: editRecord.category._id
        }
        updateCategory(cat)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editRecord, accountsFormatted])

  const onSubmit: SubmitHandler<CreateIncomeDataForm> = async (data) => {
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
    const isAmountZero = isZeroCurrency()

    if (!categoryError && !subcategoryError && !isAmountZero && !errorAmount && selectedAccount && date && subcategory && !openTagModal && Boolean(destination)) {
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

      if (Boolean(editRecord)) {
        await editTransfer({ payload, currencyState, expensesPaid: selectedExpenses })
        return
      }

      const { newValuesExpense, newValuesIncome } = getValuesIncomeAndExpense({ values: payload, expensesSelected: selectedExpenses })
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
                { destination && destination?.type === 'Crédito' && (
                  <SelectPaidSection
                    selectedExpenses={selectedExpenses}
                    totalSelectedExpenses={totalSelectedExpenses}
                    toggleOpen={toggleSelectExpensesDrawer}
                  />
                )}
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
                ) : buttonText }
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
          { destination && destination?.type === 'Crédito' && (
            <SelectPaidSection
              selectedExpenses={selectedExpenses}
              totalSelectedExpenses={totalSelectedExpenses}
              toggleOpen={toggleSelectExpensesDrawer}
            />
          )}
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
        selectedExpenses={selectedExpenses}
        totalSelectedExpenses={totalSelectedExpenses}
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