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
  tags: string[]
  updateTags: (newTag: string) => void
}

export const ManageTagsModal = ({ tags, updateTags }: ManageTagsModalProps) => {
  const [openModal, setOpenModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddTagSchema)
  })

  const onSubmit: SubmitHandler<AddTagsDataForm> = (data) => {
    updateTags(data.tag)
  }

  return (
    <>
      <Button color="light" onClick={() => setOpenModal(true)}>Agregar etiqueta</Button>
      <AnimatePresence>
        <Modal key="add-tag-modal" show={openModal} onClose={() => setOpenModal(false)}>
          <ModalHeader>Agregar etiqueta</ModalHeader>
          <ModalBody>
            <h3 className="text-2xl text-center font-semibold">Etiquetas:</h3>
            <div className="flex flex-col gap-3 md:flex-row">
              { tags.length > 0 && tags.map((tag) => (
                <Badge key={tag} className="max-w-max" color="purple">
                  <button>
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
              <Button onClick={() => setOpenModal(false)} color="red">Cancelar</Button>
              <Button onClick={() => setOpenModal(false)} color="green">Finalizar</Button>
            </div>
          </ModalFooter>
        </Modal>
      </AnimatePresence>
    </>
  )
}