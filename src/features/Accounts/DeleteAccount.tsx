import { AccountModalAction, AccountsDisplay } from "@/shared/types/accounts.types"
import { RiArrowLeftLine, RiCloseFill } from "@remixicon/react";
import { Button, ModalBody } from "flowbite-react"

interface DeleteAccountProps {
  account: AccountsDisplay
  closeModal: () => void;
  updateAccAction: (acc: AccountModalAction) => void;
}

export const DeleteAccount = ({ account, closeModal, updateAccAction }: DeleteAccountProps) => {
  return (
    <>
      <div className="flex justify-between items-start rounded-t border-b p-5 dark:border-gray-600">
        <Button onClick={() => updateAccAction('view')} color="gray" outline>
          <RiArrowLeftLine />
          Volver
        </Button>
        <h4 className="text-2xl font-bold">Eliminar {account.name}</h4>
        <Button onClick={closeModal} color="gray" outline>
          <RiCloseFill />
        </Button>
      </div>
      <ModalBody>
        <form className="flex flex-col gap-4">
          <h5 className="text-xl font-semibold">Estás por eliminar tu cuenta</h5>
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