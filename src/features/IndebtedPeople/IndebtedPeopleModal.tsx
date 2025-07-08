"use client"
import { useState } from "react"
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, ToggleSwitch  } from "flowbite-react"
import { AnimatePresence } from "motion/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"

import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { AddIndebtedPeopleDataForm, AddIndebtedPeopleSchema, IndebtedPeople, IndebtedPeopleUI } from "@/shared/types/records.types"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"
import { ShowIndebtedPeople } from "./ShowIndebtedPeople"
import { cleanCurrencyString } from "@/shared/utils/formatNumberCurrency.utils"

interface IdebtedPeopleModalProps {
  openModal: boolean
  toggleModal: () => void
  addIndebtedPerson: (newIndebtedPerson: IndebtedPeople) => void
  validatePersonExist: (name: string) => boolean
  indebtedPeople: IndebtedPeopleUI[]
}

/**
 * The component shows a table of the indebted people added and adds a button to add indebted person to open a modal.
* This component is meant to be used with the custom hook useIndebtedPeople
*/
export const IndebtedPeopleModal = ({
  openModal, toggleModal, addIndebtedPerson, validatePersonExist, indebtedPeople,
}: IdebtedPeopleModalProps) => {
  const {
    handleChange: handleChangeAmountOwed,
    currencyState: amountOwed,
    errorAmount: errorAmountOwed,
    validateZeroAmount,
    resetCurrencyState: resetAmountOwed,
  } = useCurrencyField({
    amount: null,
  })
  const {
    handleChange: handleChangeAmountPaid,
    currencyState: amountPaid,
    resetCurrencyState: resetAmountPaid,
  } = useCurrencyField({
    amount: null,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<AddIndebtedPeopleDataForm>({
    resolver: yupResolver(AddIndebtedPeopleSchema)
  })

  const [debtPaid, setDebtPaid] = useState<boolean>(false)
  const toggleDebtPaid = () => setDebtPaid((prev) => !prev)

  const onSubmit: SubmitHandler<AddIndebtedPeopleDataForm> = (data) => {
    const isValid = validateZeroAmount({ amountState: amountOwed })
    const personExists = validatePersonExist(data.name)
    if (!isValid) {
      return
    }
    if (personExists) {
      setError('name', { type: 'custom', message: 'El nombre de esa persona ya existe. Elija otro' })
      return
    }

    const amountOwedNumber = cleanCurrencyString(amountOwed)
    const amountPaidNumber = cleanCurrencyString(amountPaid)
    const payload: IndebtedPeople = {
      name: data.name,
      amount: amountOwedNumber,
      amountPaid: amountPaidNumber,
      isPaid: debtPaid
    }
    addIndebtedPerson(payload)
    toggleModal()

    // Reset form fields
    reset()
    resetAmountOwed()
    resetAmountPaid()
    setDebtPaid(false)
  }

  return (
    <section className="flex flex-col gap-4">
      <h4 className="text-xl text-center md:text-start font-semibold">Personas que te deben</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        ¿Alguien más coopera con esta transacción? Registra aquí su parte para que no se te olvide.
      </p>
      { indebtedPeople.length > 0 && (
        <ShowIndebtedPeople indebtedPeople={indebtedPeople} />
      )}
      <Button color="light" className="lg:max-w-max mx-auto" onClick={toggleModal}>¿Quién te debe?</Button>
      <AnimatePresence>
        <Modal key="add-indebted-people-modal" show={openModal} onClose={toggleModal}>
          <ModalHeader>Agregar persona que te debe</ModalHeader>
          <ModalBody>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                handleSubmit(onSubmit)(event)
              }}
              className="flex flex-col gap-4 items-center">
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