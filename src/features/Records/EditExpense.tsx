"use client"
import { useRouter } from 'next/navigation'

import { GetBudgetsResponse } from "@/shared/types/budgets.types"
import { GetCategoriesResponse } from "@/shared/types/categories.types"
import { Header } from "@/shared/ui/organisms/Header"
import { resetEditRecordLS } from '@/shared/utils/records.utils'
import { DASHBOARD_ROUTE } from '@/shared/constants/Global.constants'
import { Button } from 'flowbite-react'
import { RiArrowLeftLine } from '@remixicon/react'
import { ExpenseTemplate } from './ExpenseTemplate/ExpenseTemplate'
import { useEffect, useState } from 'react'
import { SelectedAccountLS } from '@/shared/types/global.types'
import { BankMovement } from '@/shared/types/records.types'
import { getLocalStorageInfo } from '@/shared/lib/local-storage.lib'

interface EditExpenseProps {
  resCategories: GetCategoriesResponse
  resBudgets: GetBudgetsResponse
  selectedAccount: string | null
  accessToken: string
}

export const EditExpense = ({ resCategories, resBudgets, accessToken, selectedAccount }: EditExpenseProps) => {
  const router = useRouter()
  const { categories, detailedError: errorCategories } = resCategories
  const { budgets, detailedError: errorBudgets } = resBudgets

  const handleGoBack = () => {
    resetEditRecordLS()
    router.push(DASHBOARD_ROUTE)
  }

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
        <Button onClick={handleGoBack} color="ligh">
          <RiArrowLeftLine />
          Volver
        </Button>
      </div>
      <main className="flex-1 flex flex-col items-center gap-8 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Editar gasto</h1>
        <ExpenseTemplate
          budgetsFetched={budgets}
          categories={categories}
          selectedAccount={selectedAccount}
          accessToken={accessToken}
          detailedErrorCategories={errorCategories}
          detailedErrorBudgets={errorBudgets}
          selectedAccLS={selectedAccLS}
          editRecord={editRecord}
        />
      </main>
    </div>
  )
}