"use client"
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"

import { NOT_APPLICABLE_TEXT } from "@/shared/constants/Global.constants"
import { typeRecordDict } from "@/shared/constants/records.constants"
import { BankMovement } from "@/shared/types/records.types"
import { cssTypeRecordColor, showNumberTransactionsPaid, showPriceFormatted, showTransactionStatus } from "@/shared/utils/records.utils"
import { ChartLineIcon } from "@/shared/ui/icons/ChartLineIcon"

interface TransactionsTableProps {
  records: BankMovement[]
}

export const TransactionsTable = ({ records }: TransactionsTableProps) => {
  return (
    <div data-testid="transactions-table" className="overflow-x-auto">
      <Table hoverable striped>
        <TableHead>
          <TableRow>
            <TableHeadCell className="p-4">Tipo:</TableHeadCell>
            <TableHeadCell className="p-4 min-w-32">Fecha y hora:</TableHeadCell>
            <TableHeadCell className="p-4">Pequeña descripción:</TableHeadCell>
            <TableHeadCell className="p-4 min-w-36">Monto:</TableHeadCell>
            <TableHeadCell className="p-4">Descripción:</TableHeadCell>
            <TableHeadCell className="p-4">Categoría:</TableHeadCell>
            <TableHeadCell className="p-4">Subcategoría:</TableHeadCell>
            <TableHeadCell className="p-4">Presupuesto:</TableHeadCell>
            <TableHeadCell className="p-4">Etiquetas:</TableHeadCell>
            <TableHeadCell className="p-4">Personas que deben:</TableHeadCell>
            <TableHeadCell className="p-4">Estatus de pago:</TableHeadCell>
            <TableHeadCell className="p-4">Gastos pagados:</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          { records.map((record) => (
            <TableRow key={record._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className={cssTypeRecordColor(record)}>
                <ChartLineIcon className="row-span-2 place-self-center" />
                {typeRecordDict[record.typeOfRecord]}
              </TableCell>
              <TableCell className="px-4">{record.fullDate} {record.formattedTime}</TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {record.shortName}
              </TableCell>
              <TableCell className={cssTypeRecordColor(record)}>{showPriceFormatted(record)}</TableCell>
              <TableCell className="px-4">{record.description}</TableCell>
              <TableCell className="p-4">{record.category?.categoryName}</TableCell>
              <TableCell className="p-4">{record.subCategory}</TableCell>
              <TableCell className="p-4">
                {record?.linkedBudgets && record?.linkedBudgets.length > 0 ? record?.linkedBudgets.length : NOT_APPLICABLE_TEXT}
              </TableCell>
              <TableCell className="p-4">{record?.tag && record?.tag.length > 0 ? record?.tag.length : 'Sin etiquetas'}</TableCell>
              <TableCell className="p-4">
                {record?.indebtedPeople && record?.indebtedPeople.length > 0 ? record?.indebtedPeople.length : 'Sin personas que deben'}
              </TableCell>
              <TableCell className="p-4">
                {showTransactionStatus(record)}
              </TableCell>
              <TableCell className="p-4">{showNumberTransactionsPaid(record)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}