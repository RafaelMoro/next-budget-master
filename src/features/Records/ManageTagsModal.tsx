"use client"

import { Badge, Button, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react"
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
          <h3>Etiquetas:</h3>
          { tags.length > 0 && tags.map((tag) => (
            <Badge key={tag} color="purple">{tag}</Badge>
          )) }
          <form>
            <TextInput
              data-testid="tag"
              id="tag"
              type="text"
              // {...register("shortDescription")}
            />
            <Button>Agregar etiqueta</Button>
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