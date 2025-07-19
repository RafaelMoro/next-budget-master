import { ChangeEvent } from "react"
import { Checkbox, CheckIcon, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"
import { RiCloseLine } from "@remixicon/react"

import { ExpensePaid } from "@/shared/types/records.types"

interface ExpensesPaidTableProps {
  expenses: ExpensePaid[]
  selectedExpenses: ExpensePaid[]
  handleUnselectExpense: (expense: ExpensePaid) => void
  handleSelectExpense: (expense: ExpensePaid) => void
}

export const ExpensesPaidTable = ({ expenses, selectedExpenses, handleSelectExpense, handleUnselectExpense }: ExpensesPaidTableProps) => {
  const handleCheckboxcChange = (event: ChangeEvent<HTMLInputElement>, expenseSelected: ExpensePaid) => {
    const checkboxChecked = event.target.checked
    if (!checkboxChecked) {
      handleUnselectExpense(expenseSelected)
      return
    }
    handleSelectExpense(expenseSelected)
  }
  const isSelected = (expenseId: string) => selectedExpenses.some((expense) => expense._id === expenseId);

  return (
    <div data-testid="show-expenses-paid-table" className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell className="p-4">
              <span className="sr-only">Seleccionar gasto</span>
            </TableHeadCell>
            <TableHeadCell className="px-4">Descripción</TableHeadCell>
            <TableHeadCell className="px-4">Monto</TableHeadCell>
            <TableHeadCell className="px-4">Fecha</TableHeadCell>
            <TableHeadCell className="px-2">Pagado</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {
            expenses.map((expense) => {
              const isItemSelected = isSelected(expense._id);
              return (
            <TableRow key={expense._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="p-4">
                <Checkbox defaultChecked={isItemSelected} onChange={(event) => handleCheckboxcChange(event, expense)} />
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {expense.shortName}
              </TableCell>
              <TableCell className="px-4">{expense.amountFormatted}</TableCell>
              <TableCell className="px-4">{expense.fullDate}</TableCell>
              <TableCell className="px-4">
                { expense.isPaid ? (<CheckIcon />) : (<RiCloseLine />) } 
              </TableCell>
            </TableRow>
            )
            })
          }
        </TableBody>
      </Table>
    </div>
  )
}