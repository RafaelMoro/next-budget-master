import { BankMovement } from "@/shared/types/records.types"
import { Badge, Checkbox, ListGroup, ListGroupItem } from "flowbite-react"
import { ChangeEvent } from "react"

interface ExpensesPaidListProps {
  expenses: BankMovement[]
  selectedExpenses: BankMovement[]
  handleUnselectExpense: (expense: BankMovement) => void
  handleSelectExpense: (expense: BankMovement) => void
}

export const ExpensesPaidList = ({ expenses, selectedExpenses, handleSelectExpense, handleUnselectExpense }: ExpensesPaidListProps) => {
  const getBadgeColor = (isPaid: boolean | undefined): string => isPaid ? 'success' : 'failure'
  const getBadgeText = (isPaid: boolean | undefined): string => isPaid ? 'Pagado' : 'Sin pagar'
  const isSelected = (expenseId: string) => selectedExpenses.some((expense) => expense._id === expenseId);
  const handleCheckboxcChange = (event: ChangeEvent<HTMLInputElement>, expenseSelected: BankMovement) => {
    const checkboxChecked = event.target.checked
    if (!checkboxChecked) {
      handleUnselectExpense(expenseSelected)
      return
    }
    handleSelectExpense(expenseSelected)
  }

  return (
    <div>
      <ListGroup>
        { expenses.map((expense) => (
          <ListGroupItem key={expense._id}>
            <div className="flex flex-col gap-3">
              <div className="p-4 row-span-2">
                <Checkbox
                  defaultChecked={isSelected(expense._id)}
                  onChange={(event) => handleCheckboxcChange(event, expense)}
                />
              </div>
              <h5 className="text-lg font-semibold">{expense.shortName}</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400">{expense.fullDate}</p>
              <p>{expense.amountFormatted}</p>
              <Badge color={getBadgeColor(expense?.isPaid)}>
                {getBadgeText(expense?.isPaid)}
              </Badge>
            </div>
          </ListGroupItem>
        )) }
      </ListGroup>
    </div>
  )
}