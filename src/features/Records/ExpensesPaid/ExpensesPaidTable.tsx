import { BankMovement } from "@/shared/types/records.types"
import { RiCloseLine } from "@remixicon/react"
import { Checkbox, CheckIcon, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"

interface ExpensesPaidTableProps {
  expenses: BankMovement[]
}

export const ExpensesPaidTable = ({ expenses }: ExpensesPaidTableProps) => {
  if (expenses.length === 0) {
    return (
      <div className="w-full">
        <p className="text-lg text-center py-3">No hay gastos que mostrar</p>
      </div>
    )
  }

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
            expenses.length > 0 && expenses.map((expense) => (
            <TableRow key={expense._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="p-4">
                <Checkbox />
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
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}