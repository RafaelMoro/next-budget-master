"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { AnimatePresence } from "motion/react"
import { Button, CheckIcon, Label, Spinner, Textarea, TextInput } from "flowbite-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Toaster, toast } from "sonner";
import { useMutation } from "@tanstack/react-query"

import { useCategoriesForm } from "@/shared/hooks/useCategoriesForm"
import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { Category, CategoryShown } from "@/shared/types/categories.types"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"
import { TransactionCategorizerDropdown } from "../Categories/TransactionCategorizerDropdown"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { BankMovement, IncomeDataResponse, CreateIncomeDataForm, IncomeErrorResponse, CreateIncomePayload, IncomeExpenseSchema, EditIncomePayload } from "@/shared/types/records.types"
import { CATEGORY_FETCH_ERROR, CATEGORY_REQUIRED, SUBCATEGORY_REQUIRED } from "@/shared/constants/categories.constants"
import { cleanCurrencyString } from "@/shared/utils/formatNumberCurrency.utils"
import { useManageTags } from "@/shared/hooks/useManageTags"
import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { FurtherDetailsAccordeon } from "./FurtherDetailsAccordeon"
import { ManageTagsModal } from "./ManageTagsModal"
import { createIncomeCb, editIncomeCb, resetEditRecordLS } from "@/shared/utils/records.utils"
import { DetailedError, GeneralError } from "@/shared/types/global.types"
import { CREATE_EXPENSE_INCOME_ERROR, EDIT_EXPENSE_INCOME_ERROR } from "@/shared/constants/records.constants"
import { CancelButtonExpenseTemplate } from "./ExpenseTemplate/CancelButtonExpenseTemplate"

interface IncomeTemplateProps {
  categories: Category[]
  selectedAccount: string | null
  accessToken: string
  detailedErrorCategories: DetailedError | null
  editRecord: BankMovement | null
}

export const IncomeTemplate = ({ categories, selectedAccount, accessToken, detailedErrorCategories, editRecord }: IncomeTemplateProps) => {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const buttonText = editRecord?.shortName ? 'Editar ingreso' : 'Crear ingreso'

  const { handleChange, currencyState, errorAmount, validateZeroAmount, handleEditState: handleEditCurrency,
  } = useCurrencyField({
    amount: null,
  })

  const { tags, updateTags, openTagModal, closeModal, openModal } = useManageTags()
  const { isMobileTablet, isDesktop } = useMediaQuery()

  const { categoriesShown, categorySelected, updateCategory, updateSubcategory, subcategories, subcategory,
    categoryError, subcategoryError,
    updateCategoryError, updateSubcategoryError,
  } = useCategoriesForm({ categories })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(IncomeExpenseSchema)
  })

  const { mutate: createIncome, isError: isErrorCreate, isPending: isPendingCreate, isSuccess: isSuccessCreate, error: errorCreate } = useMutation<IncomeDataResponse, IncomeErrorResponse, CreateIncomePayload>({
    mutationFn: (data) => createIncomeCb(data, accessToken),
    onSuccess: () => {
      setTimeout(() => {
        router.push(DASHBOARD_ROUTE)
      }, 1000)
    }
  })
  const {
    mutate: editIncome, isError: isErrorEdit, isPending: isPendingEdit, isSuccess: isSuccessEdit, error: errorEdit
  } = useMutation<IncomeDataResponse, IncomeErrorResponse, EditIncomePayload>({
    mutationFn: (data) => editIncomeCb(data, accessToken),
    onError: () => {
      setTimeout(() => {
        resetEditRecordLS()
        router.push(DASHBOARD_ROUTE)
      }, 1500)
    },
    onSuccess: () => {
      setTimeout(() => {
        // Refetch data after mutation
        router.refresh()
        router.push(DASHBOARD_ROUTE)
      }, 1000)
    }
  })
  const isPending = isPendingCreate || isPendingEdit
  const isSuccess = isSuccessCreate || isSuccessEdit
  const isError = isErrorCreate || isErrorEdit
  const messageErrorCreate = (errorCreate as unknown as GeneralError)?.response?.data?.error?.message
  const messageErrorEdit = (errorEdit as unknown as GeneralError)?.response?.data?.error?.message

  // Handle error message use Effect
  useEffect(() => {
    if (isError && messageErrorCreate) {
      toast.error(CREATE_EXPENSE_INCOME_ERROR);
      return
    }
  }, [isError, messageErrorCreate])
  useEffect(() => {
    if (isErrorEdit && messageErrorEdit) {
      toast.error(EDIT_EXPENSE_INCOME_ERROR);
      return
    }
  }, [isErrorEdit, messageErrorEdit])

  // Load edit record use Effect
  useEffect(() => {
    // Init state to edit expense
    if (editRecord) {
      setValue('shortDescription', editRecord?.shortName)
      setValue('description', editRecord?.description)
      setDate(new Date(editRecord.date))
      handleEditCurrency(editRecord.amountFormatted)
      updateSubcategory(editRecord.subCategory)
      updateTags(editRecord.tag)

      if (editRecord.category) {
        const cat: CategoryShown = {
          name: editRecord.category.categoryName,
          categoryId: editRecord.category._id
        }
        updateCategory(cat)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editRecord])

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
    validateZeroAmount({ amountState: currencyState })

    if (!categoryError && !subcategoryError && !errorAmount && selectedAccount && date && subcategory && !openTagModal) {
      const amountNumber = cleanCurrencyString(currencyState)
      const payload: CreateIncomePayload = {
        account: selectedAccount,
        amount: amountNumber,
        // Prop budgets deprecated
        budgets: [],
        category: categorySelected.categoryId,
        date,
        description: data.description ?? '',
        // TODO: Add feature expenses paid
        expensesPaid: [],
        indebtedPeople: [],
        shortName: data.shortDescription,
        subCategory: subcategory,
        tag: tags.current,
        typeOfRecord: 'income'
      }
      if (editRecord?.shortName) {
        const payloadEdit: EditIncomePayload = {
          ...payload,
          recordId: editRecord._id
        }
        editIncome(payloadEdit)
        return
      }

      createIncome(payload)
    }
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
          { isMobileTablet && (
            <FurtherDetailsAccordeon>
              <div className="w-full flex flex-col gap-12">
                <ManageTagsModal tags={tags.current} updateTags={updateTags} openModal={openTagModal} openModalFn={openModal} closeModalFn={closeModal} />
              </div>
            </FurtherDetailsAccordeon>
          )}
          <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-4">
            <CancelButtonExpenseTemplate action={editRecord?.shortName ? "edit" : "create"} />
            <Button
              className="hover:cursor-pointer"
              disabled={isPending || isSuccess || openTagModal}
              type="submit"
            >
              { isPending ? (
                  <Spinner aria-label="loading reset password budget master" />
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
        </aside>
      ) }
    </div>
  )
}