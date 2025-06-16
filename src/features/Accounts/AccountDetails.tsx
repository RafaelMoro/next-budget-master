import { AccountsDisplay } from "@/shared/types/accounts.types";
import { Button, ModalBody, ModalHeader } from "flowbite-react"

interface AccountDetailsProps {
  account: AccountsDisplay
  showEditAccount: () => void
}

export const AccountDetails = ({ account, showEditAccount }: AccountDetailsProps) => {
  return (
    <>
      <ModalHeader>{account.name}</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <p className="text-xl font-bold">Balance: {account.amount}</p>
          <p className="text-base text-gray-400">Tipo de cuenta: {account.type}</p>
          <p className="text-gray-400">Tarjeta emitida por: {account.accountProvider} </p>
          <div className="flex justify-between">
            <Button onClick={showEditAccount}>Editar</Button>
            <Button color="red" outline className="ml-2">Eliminar</Button>
          </div>
        </div>
      </ModalBody>
    </>
  )
}