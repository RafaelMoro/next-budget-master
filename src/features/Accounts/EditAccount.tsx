"use client"
import { useEffect, useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { AnimatePresence } from "motion/react"
import { Button, Dropdown, DropdownItem, Label, ModalBody, TextInput } from "flowbite-react"
import { RiArrowLeftLine, RiCloseFill, RiArrowDownSLine } from "@remixicon/react"

import { AccountModalAction, AccountsDisplay, EditAccountFormData, EditAccountSchema, TYPE_OF_ACCOUNTS } from "@/shared/types/accounts.types"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField";
import { useCurrencyField } from "@/shared/hooks/useCurrencyField";
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage";

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

  const { handleChange, currencyState } = useCurrencyField({
    amount: account.amount
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAccountFormData>({
    resolver: yupResolver(EditAccountSchema)
  })

  useEffect(() => {
    if (account.type) {
      const fileteredTypes = typeAccounts.filter(type => type !== account.type)
      setFilteredAccountTypes(fileteredTypes)
    }
  }, [account.type, typeAccounts])

  const onSubmit: SubmitHandler<EditAccountFormData> = (data) => {
      console.log('data', data)
    }

  return (
    <AnimatePresence>
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title">Titulo de la cuenta</Label>
            </div>
            <TextInput
              data-testid="title"
              defaultValue={account.name}
              id="title"
              type="text"
              {...register("title")}
              />
            { errors?.title?.message && (
              <ErrorMessage isAnimated>{errors.title?.message}</ErrorMessage>
            )}
          </div>
          <CurrencyField
            labelName="Saldo de la cuenta"
            dataTestId="amount"
            fieldId="amount"
            value={currencyState}
            handleChange={handleChange}
          />
          <Dropdown label="" renderTrigger={() => (
            <Button color="dark">
              Tipo de cuenta: {selectedAccountType}
              <RiArrowDownSLine />
            </Button>
          )}>
            { filteredAccountTypes.map((type, index) => (
              <DropdownItem
                onClick={() => handleSelectAccountType(type)}
                value={type}
                key={`${type}-${index}-${account.accountId}`}
              >{type}</DropdownItem>
            ))}
          </Dropdown>
          <Button className="hover:cursor-pointer" type="submit">Edit</Button>
          <Button color="alternative" onClick={closeModal}>
            Cancel
          </Button>
        </form>
      </ModalBody>
    </AnimatePresence>
  )
}