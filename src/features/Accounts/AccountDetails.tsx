import { AccountProvider } from "@/shared/types/accounts.types";
import { Button, ModalBody, ModalHeader } from "flowbite-react"

interface AccountDetailsProps {
  accountId: string
  name: string;
  balance: string;
  accountType: string;
  accountProvider?: AccountProvider;
}

export const AccountDetails = ({ name, balance, accountType, accountProvider }: AccountDetailsProps) => {
  return (
    <>
      <ModalHeader>{name}</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <p className="text-xl font-bold">Balance: {balance}</p>
          <p className="text-base text-gray-400">Tipo de cuenta: {accountType}</p>
          <p className="text-gray-400">Tarjeta emitida por: {accountProvider} </p>
          <div className="flex justify-between">
            <Button>Editar</Button>
            <Button color="red" outline className="ml-2">Eliminar</Button>
          </div>
        </div>
      </ModalBody>
    </>
  )
}