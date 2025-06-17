"use client"
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { AnimatePresence } from "motion/react"
import { Button, Label, ModalBody, TextInput } from "flowbite-react"
import { RiArrowLeftLine, RiCloseFill } from "@remixicon/react"

import { AccountModalAction, AccountProvider, AccountsDisplay, AccountTypes, EditAccountFormData, EditAccountSchema } from "@/shared/types/accounts.types"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField";
import { useCurrencyField } from "@/shared/hooks/useCurrencyField";
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage";
import { AccountTypeDropdown } from "@/features/Accounts/AccountTypeDropdown";
import { AccountProviderDropdown } from "@/features/Accounts/AccountProviderDropdown";

interface EditAccountProps {
  account: AccountsDisplay
  closeModal: () => void;
  updateAccAction: (acc: AccountModalAction) => void;
}

export const EditAccount = ({ account, closeModal, updateAccAction }: EditAccountProps) => {
  const [selectedAccountType, setSelectedAccountType] = useState<AccountTypes>(account.type)
  const [selectedProvider, setSelectedProvider] = useState<AccountProvider>(account.accountProvider ?? 'mastercard')

  const changeSelectedAccountType = (newAccType: AccountTypes) => setSelectedAccountType(newAccType)
  const changeSelectedProviderType = (newProvider: AccountProvider) => setSelectedProvider(newProvider)

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

  const onSubmit: SubmitHandler<EditAccountFormData> = (data) => {
    console.log('data', data)
  }

  return (
    <AnimatePresence>
      <div key={`edit-acc-${account.accountId}`} className="flex justify-between items-start rounded-t border-b p-5 dark:border-gray-600">
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="alias">Alias</Label>
            </div>
            <TextInput
              data-testid="alias"
              defaultValue={account.alias}
              id="alias"
              type="text"
              {...register("alias")}
              />
            { errors?.alias?.message && (
              <ErrorMessage isAnimated>{errors.alias?.message}</ErrorMessage>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="terminationNumber">Terminación de la cuenta</Label>
            </div>
            <TextInput
              data-testid="terminationNumber"
              defaultValue={account.terminationFourDigits ?? 0}
              id="terminationNumber"
              type="number"
              {...register("terminationFourDigits")}
              />
            { errors?.terminationFourDigits?.message && (
              <ErrorMessage isAnimated>{errors.terminationFourDigits?.message}</ErrorMessage>
            )}
          </div>
          <CurrencyField
            labelName="Saldo de la cuenta"
            dataTestId="amount"
            fieldId="amount"
            value={currencyState}
            handleChange={handleChange}
          />
          <AccountTypeDropdown selectedAccountType={selectedAccountType} changeSelectedAccountType={changeSelectedAccountType} />
          <AccountProviderDropdown selectedProvider={selectedProvider} changeSelectedProviderType={changeSelectedProviderType}  />
          <div className="flex justify-between">
            <Button color="alternative" onClick={closeModal}>
              Cancel
            </Button>
            <Button className="hover:cursor-pointer" type="submit">Edit</Button>
          </div>
        </form>
      </ModalBody>
    </AnimatePresence>
  )
}