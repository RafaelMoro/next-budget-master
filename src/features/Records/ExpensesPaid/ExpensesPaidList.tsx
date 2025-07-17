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
    <div className="max-h-[650px] overflow-y-scroll">
      <ListGroup>
        { expenses.map((expense) => (
          <ListGroupItem className="max-w-80" key={expense._id}>
            <div className="w-full grid grid-layout-expenses-paid-list grid-rows-3 gap-2">
              <div className="p-2 row-span-3 place-self-center">
                <Checkbox
                  defaultChecked={isSelected(expense._id)}
                  onChange={(event) => handleCheckboxcChange(event, expense)}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 col-span-2">{expense.fullDate}</p>
              <h5 className="text-start text-base">{expense.shortName}</h5>
              <p className="col-start-3 col-end-4 row-span-2 place-self-center text-red-500">- {expense.amountFormatted}</p>
              <Badge className="max-w-max col-start-2 col-end-3 row-start-3 row-end-4 text-xs" color={getBadgeColor(expense?.isPaid)}>
                {getBadgeText(expense?.isPaid)}
              </Badge>
            </div>
          </ListGroupItem>
        )) }
      </ListGroup>
    </div>
  )
}