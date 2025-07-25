"use client"
import { useEffect, useState } from "react"

import { GetCategoriesResponse } from "@/shared/types/categories.types"
import { CancelButtonExpenseTemplate } from "../ExpenseTemplate/CancelButtonExpenseTemplate"
import { TransferTemplate } from "../TransferTemplate"
import { getLocalStorageInfo } from "@/shared/lib/local-storage.lib"
import { BankMovement } from "@/shared/types/records.types"
import { Header } from "@/shared/ui/organisms/Header"

interface EditTransferProps {
  resCategories: GetCategoriesResponse
  selectedAccount: string | null
  accessToken: string
}
export const EditTransfer = ({ resCategories, selectedAccount, accessToken }: EditTransferProps) => {
  const { categories, detailedError: errorCategories } = resCategories

  const [editRecord, setEditRecord] = useState<BankMovement | null>(null)

  useEffect(() => {
    const { "edit-record": editRecordGotten, } = getLocalStorageInfo()
    if (editRecordGotten) {
      setEditRecord(editRecordGotten.record)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
      <div className="max-w-min ml-5 mb-8 md:mb-0">
        <CancelButtonExpenseTemplate action="goBack" />
      </div>
      <main className="flex-1 flex flex-col items-center gap-8 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Editar transferencia</h1>
      </main>
      <TransferTemplate
        categories={categories}
        selectedAccount={selectedAccount}
        accessToken={accessToken}
        detailedErrorCategories={errorCategories}
        editRecord={editRecord}
        subscreen="transfer"
      />
    </div>
  )
}