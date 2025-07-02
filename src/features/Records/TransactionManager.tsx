"use client"
import { useState } from "react"
import { TransactionManagerGroupButton } from "./TransactionManagerGroupButton"
import { TransactionScreens } from "@/shared/types/dashboard.types"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"

export const TransactionManager = () => {
  const [subscreen, setSubscreen] = useState<TransactionScreens>('expense')
  const updateExpenseScreen = () => setSubscreen('expense')
  const updateIncomeScreen = () => setSubscreen('income')
  const updateTransferScreen = () => setSubscreen('transfer')

  return (
    <>
      <TransactionManagerGroupButton
        screen={subscreen}
        updateExpenseScreen={updateExpenseScreen}
        updateIncomeScreen={updateIncomeScreen}
        updateTransferScreen={updateTransferScreen}
      />
      <form className="max-w-xs mx-auto">
        <DateTimePicker />
      </form>
    </>

  )
}