"use client"
import { useEffect, useMemo, useState } from "react";
import { Button, Dropdown, DropdownItem, Label, ModalBody, TextInput } from "flowbite-react"
import { RiArrowLeftLine, RiCloseFill } from "@remixicon/react"

import { AccountModalAction, AccountsDisplay, TYPE_OF_ACCOUNTS } from "@/shared/types/accounts.types"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField";
import { useCurrencyField } from "@/shared/hooks/useCurrencyField";

interface EditAccountProps {
  account: AccountsDisplay
  closeModal: () => void;
  updateAccAction: (acc: AccountModalAction) => void;
}

export const EditAccount = ({ account, closeModal, updateAccAction }: EditAccountProps) => {
  const typeAccounts = useMemo(() => [...TYPE_OF_ACCOUNTS], []);
  const [selectedAccountType, setSelectedAccountType] = useState<string>(account.type)
  const [filteredAccountTypes, setFilteredAccountTypes] = useState<string[]>(typeAccounts)

  const handleSelectAccountType = (newAccType: string) => {
    setSelectedAccountType(newAccType)
    const fileteredTypes = typeAccounts.filter(type => type !== newAccType)
    setFilteredAccountTypes(fileteredTypes)
  }

  useEffect(() => {
    if (account.type) {
      const fileteredTypes = typeAccounts.filter(type => type !== account.type)
      setFilteredAccountTypes(fileteredTypes)
    }
  }, [account.type, typeAccounts])

  const { handleChange, currencyState } = useCurrencyField({
    amount: account.amount
  })

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
          <CurrencyField
            labelName="Saldo de la cuenta"
            dataTestId="amount"
            fieldId="amount"
            value={currencyState}
            handleChange={handleChange}
          />
          <Dropdown label={`Tipo de cuenta: ${selectedAccountType}`} inline>
            { filteredAccountTypes.map((type) => (
              <DropdownItem onClick={() => handleSelectAccountType(type)} value={type} key={type}>{type}</DropdownItem>
            ))}
          </Dropdown>
        </form>
      </ModalBody>
    </>
  )
}