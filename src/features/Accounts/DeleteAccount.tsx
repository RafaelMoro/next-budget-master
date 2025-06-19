import { AccountModalAction, AccountsDisplay } from "@/shared/types/accounts.types"
import { Button, ModalBody, ModalHeader } from "flowbite-react"

interface DeleteAccountProps {
  account: AccountsDisplay
  closeModal: () => void;
  updateAccAction: (acc: AccountModalAction) => void;
}

export const DeleteAccount = ({ account, closeModal, updateAccAction }: DeleteAccountProps) => {
  return (
    <>
      <ModalHeader>{account.name}</ModalHeader>
      <ModalBody>
        <form className="flex flex-col gap-4">
          <h4 className="text-2xl font-bold">Estás por eliminar tu cuenta</h4>
          <p className="text-base text-gray-400">
            Estás por eliminar tu cuenta de forma permanente. Si estás completamente seguro, continúa.
            No podrás recuperar tu información después.
          </p>
          <p className="text-base text-gray-400">
            ¿Estás seguro que deseas continuar?
          </p>
          <div className="flex justify-between">
            <Button outline onClick={() => updateAccAction('view')}>Cancelar</Button>
            <Button color="red" className="hover:cursor-pointer" type="submit">Eliminar</Button>
          </div>
        </form>
      </ModalBody>
    </>
  )
}