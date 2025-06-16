import { AccountModalAction, AccountsDisplay } from "@/shared/types/accounts.types"
import { Button, Label, ModalBody, TextInput } from "flowbite-react"
import { RiArrowLeftLine, RiCloseFill } from "@remixicon/react"

interface EditAccountProps {
  account: AccountsDisplay
  closeModal: () => void;
  updateAccAction: (acc: AccountModalAction) => void;
}

export const EditAccount = ({ account, closeModal, updateAccAction }: EditAccountProps) => {
  return (
    <>
      <div className="flex justify-between items-start rounded-t border-b p-5 dark:border-gray-600">
        <Button onClick={() => updateAccAction('view')} color="gray" outline>
          <RiArrowLeftLine />
          Volver
        </Button>
        Editar {account.name}
        <Button onClick={closeModal} color="gray" outline>
          <RiCloseFill />
        </Button>
      </div>
      <ModalBody>
        <form>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">Titulo de la cuenta</Label>
            </div>
            <TextInput
              data-testid="name"
              defaultValue={account.name}
              id="name"
              type="text"
              // {...register("firstName")}
              />
            {/* { errors?.firstName?.message && (
              <ErrorMessage isAnimated>{errors.firstName?.message}</ErrorMessage>
            )} */}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="amount">Cantidad disponible</Label>
            </div>
            <TextInput
              data-testid="amount"
              defaultValue={account.amount}
              id="amount"
              type="text"
              // {...register("firstName")}
              />
            {/* { errors?.firstName?.message && (
              <ErrorMessage isAnimated>{errors.firstName?.message}</ErrorMessage>
            )} */}
          </div>
        </form>
      </ModalBody>
    </>
  )
}