"use client"
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, ToggleSwitch  } from "flowbite-react"
import { AnimatePresence } from "motion/react"

import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { AddIndebtedPeopleDataForm, AddIndebtedPeopleSchema } from "@/shared/types/records.types"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"

interface IdebtedPeopleModalProps {
  openModal: boolean
  toggleModal: () => void
}

export const IndebtedPeopleModal = ({ openModal, toggleModal }: IdebtedPeopleModalProps) => {
  const {
    handleChange: handleChangeAmountOwed,
    currencyState: amountOwed,
    errorAmount: errorAmountOwed,
    validateZeroAmount
  } = useCurrencyField({
    amount: null,
  })
  const {
    handleChange: handleChangeAmountPaid,
    currencyState: amountPaid,
  } = useCurrencyField({
    amount: null,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddIndebtedPeopleDataForm>({
    resolver: yupResolver(AddIndebtedPeopleSchema)
  })

  const [debtPaid, setDebtPaid] = useState<boolean>(false)
  const toggleDebtPaid = () => setDebtPaid((prev) => !prev)

  const onSubmit: SubmitHandler<AddIndebtedPeopleDataForm> = (data) => {
    validateZeroAmount({ amountState: amountOwed })
    console.log('data', data)
  }

  return (
    <section className="flex flex-col gap-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        ¿Alguien más coopera con esta transacción? Registra aquí su parte para que no se te olvide.
      </p>
      <Button color="light" onClick={toggleModal}>¿Quién te debe?</Button>
      <AnimatePresence>
        <Modal key="add-indebted-people-modal" show={openModal} onClose={toggleModal}>
          <ModalHeader>Agregar persona que te debe</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="tag">Nombre completo</Label>
                </div>
                <TextInput
                  data-testid="name"
                  id="name"
                  type="text"
                  {...register("name")}
                />
                { errors?.name?.message && (
                  <ErrorMessage isAnimated={false}>{errors?.name?.message}</ErrorMessage>
                )}
              </div>
              <CurrencyField
                labelName="Cantidad a deber"
                dataTestId="amountOwed"
                fieldId="amountOwed"
                value={amountOwed}
                handleChange={handleChangeAmountOwed}
              />
              { errorAmountOwed && (
                <ErrorMessage isAnimated>{errorAmountOwed}</ErrorMessage>
              )}
              <CurrencyField
                labelName="Cantidad pagada"
                dataTestId="amountPaid"
                fieldId="amountPaid"
                value={amountPaid}
                handleChange={handleChangeAmountPaid}
              />
              <ToggleSwitch checked={debtPaid} label="Deuda pagada" onChange={toggleDebtPaid} />
              <Button type="submit" className="max-w-max">Agregar persona</Button>
            </form>
          </ModalBody>
        </Modal>
      </AnimatePresence>
    </section>
  )
}