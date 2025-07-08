import { Avatar, CheckIcon, ListGroup, ListGroupItem, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { RiCloseLine } from "@remixicon/react";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { IndebtedPeopleUI } from "@/shared/types/records.types";

interface ShowIndebtedPeopleProps {
  indebtedPeople: IndebtedPeopleUI[]
}

export const ShowIndebtedPeople = ({ indebtedPeople }: ShowIndebtedPeopleProps) => {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <>
        <h4 className="text-center text-lg">Personas que deben:</h4>
        <ListGroup>
          { indebtedPeople.map((person) => (
            <ListGroupItem key={person.name}>
              <div className="w-full grid grid-cols-[min-content_1fr_1fr] grid-rows-2 place-items-center gap-2">
                <Avatar className="justify-self-start row-span-2" placeholderInitials={person.name.charAt(0)} rounded />
                <p className="justify-self-start text-base place-self-end">{person.name}</p>
                { !person.isPaid && (
                  <p className="text-xs justify-self-start place-self-start text-blue-400 row-start-2 row-end-3 col-start-2 col-end-3">
                    Restan - {person.remainingAmountFormatted}
                  </p>
                )}
                { person.isPaid && (
                  <p className="text-xs justify-self-start place-self-start text-green-400 row-start-2 row-end-3 col-start-2 col-end-3">
                    Pagado
                  </p>
                )}
                <p className="text-red-600 justify-self-end row-span-2" >- {person.amountFormatted}</p>
              </div>
            </ListGroupItem>
          )) }
        </ListGroup>
      </>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Persona</TableHeadCell>
            <TableHeadCell>Debe</TableHeadCell>
            <TableHeadCell>Ha pagado</TableHeadCell>
            <TableHeadCell>Resta</TableHeadCell>
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