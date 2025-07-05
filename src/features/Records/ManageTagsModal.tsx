"use client"

import { Badge, Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react"
import { useState } from "react"

interface ManageTagsModalProps {
  tags: string[]
  updateTags: (newTag: string) => void
}

export const ManageTagsModal = ({ tags, updateTags }: ManageTagsModalProps) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Button color="light" onClick={() => setOpenModal(true)}>Agregar etiqueta</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Agregar etiqueta</ModalHeader>
        <ModalBody>
          <h3 className="text-2xl text-center font-semibold">Etiquetas:</h3>
          { tags.length > 0 && tags.map((tag) => (
            <Badge key={tag} color="purple">{tag}</Badge>
          )) }
          <form className="flex flex-col gap-4 items-center mt-8">
             <div>
              <div className="mb-2 block">
                <Label htmlFor="tag">Etiqueta</Label>
              </div>
              <TextInput
                data-testid="tag"
                id="tag"
                type="text"
                // {...register("shortDescription")}
              />
              {/* { errors?.shortDescription?.message && (
                <ErrorMessage isAnimated>{errors.shortDescription?.message}</ErrorMessage>
              )} */}
            </div>
            <Button className="max-w-max">Agregar etiqueta</Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="w-full flex justify-between">
            <Button onClick={() => setOpenModal(false)} color="red">Cancelar</Button>
            <Button onClick={() => setOpenModal(false)} color="green">Finalizar</Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}