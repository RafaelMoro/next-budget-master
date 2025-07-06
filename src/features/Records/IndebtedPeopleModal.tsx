"use client"

import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react"
import { AnimatePresence } from "motion/react"

interface IdebtedPeopleModalProps {
  openModal: boolean
  toggleModal: () => void
}

export const IndebtedPeopleModal = ({ openModal, toggleModal }: IdebtedPeopleModalProps) => {
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
            <form className="flex flex-col gap-4 items-center mt-8">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="tag">Etiqueta</Label>
                </div>
                <TextInput
                  data-testid="name"
                  id="name"
                  type="text"
                />
                {/* { error && (
                  <ErrorMessage isAnimated={false}>{error}</ErrorMessage>
                )} */}
                <Button type="submit" className="max-w-max">Agregar persona</Button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex justify-between">
              <Button color="red">Cancelar</Button>
              <Button color="green">Finalizar</Button>
            </div>
          </ModalFooter>
        </Modal>
      </AnimatePresence>
    </section>
  )
}