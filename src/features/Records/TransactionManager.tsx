"use client"
import { useState } from "react"
import { TransactionManagerGroupButton } from "./TransactionManagerGroupButton"
import { TransactionScreens } from "@/shared/types/dashboard.types"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { Header } from "@/shared/ui/organisms/Header"

export const TransactionManager = () => {
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
      <main className="flex-1 flex flex-col items-center gap-5 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Crear {titleDictionary[subscreen]}</h1>
        <TransactionManagerGroupButton
          screen={subscreen}
          updateExpenseScreen={updateExpenseScreen}
          updateIncomeScreen={updateIncomeScreen}
          updateTransferScreen={updateTransferScreen}
        />
        <form className="max-w-xs mx-auto">
          <DateTimePicker />
        </form>
      </main>
    </div>

  )
}