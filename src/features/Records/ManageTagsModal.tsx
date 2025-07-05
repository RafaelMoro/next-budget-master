"use client"

import { AddTagSchema, AddTagsDataForm } from "@/shared/types/records.types"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"
import { yupResolver } from "@hookform/resolvers/yup"
import { RiCloseFill } from "@remixicon/react"
import { Badge, Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react"
import { AnimatePresence } from "motion/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface ManageTagsModalProps {
  openModal: boolean
  toggleModal: () => void
  tags: string[]
  updateTags: (newTags: string[]) => void
}

export const ManageTagsModal = ({ tags, updateTags, openModal, toggleModal }: ManageTagsModalProps) => {
  const [internalTags, setInternalTags] = useState<string[]>(tags)
  const updateInternalTags = (newTag: string) => {
    setInternalTags([...internalTags, newTag])
  }
  const removeTag = (tagToRemove: string) => {
    setInternalTags(internalTags.filter(tag => tag !== tagToRemove))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddTagSchema)
  })

  const onSubmit: SubmitHandler<AddTagsDataForm> = (data) => {
    updateInternalTags(data.tag)
  }

  const handleFinalize = () => {
    updateTags(internalTags)
    toggleModal()
  }

  return (
    <>
      <Button color="light" onClick={toggleModal}>Agregar etiqueta</Button>
      <AnimatePresence>
        <Modal key="add-tag-modal" show={openModal} onClose={toggleModal}>
          <ModalHeader>Agregar etiqueta</ModalHeader>
          <ModalBody>
            <h3 className="text-2xl text-center font-semibold">Etiquetas:</h3>
            <div className="flex flex-col gap-3 md:flex-row">
              { internalTags.length > 0 && internalTags.map((tag) => (
                <Badge key={tag} className="max-w-max" color="purple">
                  <button onClick={() => removeTag(tag)}>
                    <RiCloseFill className="inline-block mr-1" />
                  </button>
                  {tag}
                </Badge>
              )) }
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center mt-8">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="tag">Etiqueta</Label>
                </div>
                <TextInput
                  data-testid="tag"
                  id="tag"
                  type="text"
                  {...register("tag")}
                />
                { errors?.tag?.message && (
                  <ErrorMessage isAnimated={false}>{errors.tag?.message}</ErrorMessage>
                )}
              </div>
              <Button type="submit" className="max-w-max">Agregar etiqueta</Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <div className="w-full flex justify-between">
              <Button onClick={toggleModal} color="red">Cancelar</Button>
              <Button onClick={handleFinalize} color="green">Finalizar</Button>
            </div>
          </ModalFooter>
        </Modal>
      </AnimatePresence>
    </>
  )
}