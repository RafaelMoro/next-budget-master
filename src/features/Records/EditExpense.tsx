"use client"
import { useRouter } from 'next/navigation'

import { GetBudgetsResponse } from "@/shared/types/budgets.types"
import { GetCategoriesResponse } from "@/shared/types/categories.types"
import { Header } from "@/shared/ui/organisms/Header"
import { resetEditRecordLS } from '@/shared/utils/records.utils'
import { DASHBOARD_ROUTE } from '@/shared/constants/Global.constants'
import { Button } from 'flowbite-react'
import { RiArrowLeftLine } from '@remixicon/react'
import { ExpenseTemplate } from './ExpenseTemplate'

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
          selectedAccLS={null}
        />
      </main>
    </div>
  )
}