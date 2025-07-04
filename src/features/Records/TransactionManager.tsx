"use client"
import { useState } from "react"
import { RiArrowLeftLine } from "@remixicon/react"

import { TransactionManagerGroupButton } from "./TransactionManagerGroupButton"
import { TransactionScreens } from "@/shared/types/dashboard.types"
import { Header } from "@/shared/ui/organisms/Header"
import { Category } from "@/shared/types/categories.types"
import { LinkButton } from "@/shared/ui/atoms/LinkButton"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { DetailedError } from "@/shared/types/global.types";
import { ExpenseTemplate } from "./ExpenseTemplate";

interface TransactionManagerProps {
  categories: Category[]
  selectedAccount: string | null
  accessToken: string
  detailedError: DetailedError | null
}

export const TransactionManager = ({ categories, selectedAccount, accessToken, detailedError }: TransactionManagerProps) => {
  const [subscreen, setSubscreen] = useState<TransactionScreens>('expense')
  const updateExpenseScreen = () => setSubscreen('expense')
  const updateIncomeScreen = () => setSubscreen('income')
  const updateTransferScreen = () => setSubscreen('transfer')

  const titleDictionary: Record<TransactionScreens, string> = {
    expense: 'Gasto',
    income: 'Ingreso',
    transfer: 'Transferencia',
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-min ml-5">
        <LinkButton href={DASHBOARD_ROUTE} type="greySecondary">
          <RiArrowLeftLine />
          Volver
      </LinkButton>
      </div>
      <main className="flex-1 flex flex-col items-center gap-8 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Crear {titleDictionary[subscreen]}</h1>
        <TransactionManagerGroupButton
          screen={subscreen}
          updateExpenseScreen={updateExpenseScreen}
          updateIncomeScreen={updateIncomeScreen}
          updateTransferScreen={updateTransferScreen}
        />
        { subscreen === 'expense' && (
          <ExpenseTemplate
            categories={categories}
            selectedAccount={selectedAccount}
            accessToken={accessToken}
            detailedError={detailedError}
          />
        ) }
      </main>
    </div>

  )
}