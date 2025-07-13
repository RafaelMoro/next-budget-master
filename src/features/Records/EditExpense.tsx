"use client"
import { useRouter } from 'next/navigation'

import { GetBudgetsResponse } from "@/shared/types/budgets.types"
import { GetCategoriesResponse } from "@/shared/types/categories.types"
import { Header } from "@/shared/ui/organisms/Header"
import { resetEditRecordLS } from '@/shared/utils/records.utils'
import { DASHBOARD_ROUTE } from '@/shared/constants/Global.constants'
import { Button } from 'flowbite-react'
import { RiArrowLeftLine } from '@remixicon/react'

interface EditExpenseProps {
  resCategories: GetCategoriesResponse
  resBudgets: GetBudgetsResponse
  selectedAccount: string | null
  accessToken: string
}

export const EditExpense = ({ resCategories, resBudgets }: EditExpenseProps) => {
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
    </div>
  )
}