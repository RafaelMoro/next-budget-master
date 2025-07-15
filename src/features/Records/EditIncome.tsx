"use client"
import { useEffect, useState } from "react"

import { Header } from "@/shared/ui/organisms/Header"
import { CancelButtonExpenseTemplate } from "./ExpenseTemplate/CancelButtonExpenseTemplate"
import { IncomeTemplate } from "./IncomeTemplate"
import { GetCategoriesResponse } from "@/shared/types/categories.types"
import { SelectedAccountLS } from "@/shared/types/global.types"
import { BankMovement } from "@/shared/types/records.types"
import { getLocalStorageInfo } from "@/shared/lib/local-storage.lib"

interface EditIncomeProps {
  resCategories: GetCategoriesResponse
  selectedAccount: string | null
  accessToken: string
}

export const EditIncome = ({
  resCategories,
  selectedAccount,
  accessToken
}: EditIncomeProps) => {
  const { categories, detailedError: errorCategories } = resCategories

  const [selectedAccLS, setSelectedAccLS] = useState<SelectedAccountLS | null>(null)
  const [editRecord, setEditRecord] = useState<BankMovement | null>(null)

  useEffect(() => {
      const { "edit-record": editRecordGotten, "selected-account": accInfo } = getLocalStorageInfo()
      if (editRecordGotten) {
        setEditRecord(editRecordGotten.record)
      }
      if (accInfo) {
        setSelectedAccLS(accInfo)
      }
    }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="max-w-min ml-5 mb-8 md:mb-0">
        <CancelButtonExpenseTemplate action="goBack" />
      </div>
      <main className="flex-1 flex flex-col items-center gap-8 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Editar ingreso</h1>
      </main>
      <IncomeTemplate
        categories={categories}
        selectedAccount={selectedAccount}
        accessToken={accessToken}
        detailedErrorCategories={errorCategories}
        editRecord={editRecord}
      />
    </div>
  )
}