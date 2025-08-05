"use client"
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react"

export const TransactionsTable = () => {
  return (
    <div data-testid="transactions-table" className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell className="p-4">Tipo:</TableHeadCell>
            <TableHeadCell className="p-4">Fecha y hora:</TableHeadCell>
            <TableHeadCell className="p-4">Pequeña descripción:</TableHeadCell>
            <TableHeadCell className="p-4">Monto:</TableHeadCell>
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
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="px-4">Gasto</TableCell>
            <TableCell className="px-4">Vie, 1 Ago, 2025 20:10pm</TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Uber gym al depa
            </TableCell>
            <TableCell className="p-4">$242.10</TableCell>
            <TableCell className="px-4">Uber del gimnasio al departamento</TableCell>
            <TableCell className="p-4">Transporte</TableCell>
            <TableCell className="p-4">Uber/Didi</TableCell>
            <TableCell className="p-4">No Aplica</TableCell>
            <TableCell className="p-4">No Aplica</TableCell>
            <TableCell className="p-4">4</TableCell>
            <TableCell className="p-4">Sin pagar</TableCell>
            <TableCell className="p-4">No Aplica</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}