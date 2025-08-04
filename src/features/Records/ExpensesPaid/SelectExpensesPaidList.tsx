import { ExpensePaid } from "@/shared/types/records.types"
import { Badge, Checkbox, ListGroup, ListGroupItem } from "flowbite-react"
import { ChangeEvent } from "react"
import { getBadgeColor, getBadgeText } from "./expensePaid.utils"

interface SelectExpensesPaidListProps {
  expenses: ExpensePaid[]
  selectedExpenses: ExpensePaid[]
  totalSelectedExpenses: string
  handleUnselectExpense: (expense: ExpensePaid) => void
  handleSelectExpense: (expense: ExpensePaid) => void
}

/**
 * This component is to select the expenses paid in the select paid drawer
 */
export const SelectExpensesPaidList = ({ expenses, selectedExpenses, totalSelectedExpenses, handleSelectExpense, handleUnselectExpense }: SelectExpensesPaidListProps) => {
  const isSelected = (expenseId: string) => selectedExpenses.some((expense) => expense._id === expenseId);
  const handleCheckboxcChange = (event: ChangeEvent<HTMLInputElement>, expenseSelected: ExpensePaid) => {
    const checkboxChecked = event.target.checked
    if (!checkboxChecked) {
      handleUnselectExpense(expenseSelected)
      return
    }
    handleSelectExpense(expenseSelected)
  }

  return (
    <div className="max-h-[700px] overflow-y-scroll">
      <div className="flex flex-col justify-between mb-5">
        <p>Movimientos seleccionados: {selectedExpenses.length}</p>
        <p>Total: {totalSelectedExpenses}</p>
      </div>
      <ListGroup>
        { expenses.map((expense) => (
          <ListGroupItem className="max-w-80 sm:max-w-screen" key={expense._id}>
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