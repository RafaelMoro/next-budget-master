import { AccountsDisplay } from "@/shared/types/accounts.types"
import { Label, ModalBody, ModalHeader, TextInput } from "flowbite-react"

interface EditAccountProps {
  account: AccountsDisplay
}

export const EditAccount = ({ account }: EditAccountProps) => {
  return (
    <>
      <ModalHeader>Editar {account.name}</ModalHeader>
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