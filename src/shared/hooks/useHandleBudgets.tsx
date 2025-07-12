"use client"
import { useEffect, useState } from "react"
import { Budget, SelectBudget } from "../types/budgets.types"

interface UseHandleBudgetsProps {
  budgetsFetched: Budget[]
}

export const useHandleBudgets = ({ budgetsFetched }: UseHandleBudgetsProps) => {
  const [budgets, setBudgets] = useState<SelectBudget[]>([])

  useEffect(() => {
    if (budgetsFetched.length > 0) {
      const budgetsFormatted: SelectBudget[] = budgetsFetched.map((budget) => ({
        budgetId: budget._id,
        name: budget.name,
      }))
      setBudgets(budgetsFormatted)
    }
  }, [budgetsFetched])

  return {
    budgets
  }
}