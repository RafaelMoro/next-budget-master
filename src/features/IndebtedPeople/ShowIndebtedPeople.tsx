import { IndebtedPeopleUI } from "@/shared/types/records.types";
import { RiCloseLine } from "@remixicon/react";
import { CheckIcon, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

interface ShowIndebtedPeopleProps {
  indebtedPeople: IndebtedPeopleUI[]
}

export const ShowIndebtedPeople = ({ indebtedPeople }: ShowIndebtedPeopleProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Persona</TableHeadCell>
            <TableHeadCell>Cantidad a deber</TableHeadCell>
            <TableHeadCell>Cantidad Pagada</TableHeadCell>
            <TableHeadCell>Deuda restante</TableHeadCell>
            <TableHeadCell>Pagado</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Acciones</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {
            indebtedPeople.map((person) => (
            <TableRow key={person.name} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {person.name}
              </TableCell>
              <TableCell>{person.amountFormatted}</TableCell>
              <TableCell>{person.amountPaidFormatted}</TableCell>
              <TableCell>{person.remainingAmountFormatted}</TableCell>
              <TableCell>
                { person.isPaid ? (<CheckIcon />) : (<RiCloseLine />) }
              </TableCell>
              <TableCell>
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Edit
                </a>
              </TableCell>
            </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}