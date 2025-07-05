"use client"

import { useState } from "react"
import { RiCloseFill } from "@remixicon/react"
import { Badge, Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react"
import { AnimatePresence } from "motion/react"

import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"
import { TAG_MAX_LENGTH_ERROR, TAG_MIN_LENGTH_ERROR, TAG_REQUIRED_ERROR } from "@/shared/constants/records.constants"

interface ManageTagsModalProps {
  openModal: boolean
  toggleModal: () => void
  tags: string[]
  updateTags: (newTags: string[]) => void
}

/**
* This component is used to manage tags for records with a modal
* This component is meant to be used with the custom hook useManageTags
*/
export const ManageTagsModal = ({ tags, updateTags, openModal, toggleModal }: ManageTagsModalProps) => {
  const subtext = tags.length === 0 ? 'Crear' : 'Administrar'
  const [internalTags, setInternalTags] = useState<string[]>(tags)
  // Using state instead of useForm because I can't clear the input without having required validation after submit
  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const updateInternalTags = (newTag: string) => {
    setInternalTags([...internalTags, newTag])
  }
  const removeTag = (tagToRemove: string) => {
    setInternalTags(internalTags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = () => {
    // Validations
    if (!inputValue) {
      setError(TAG_REQUIRED_ERROR)
      return
    }
    if (inputValue.length < 3) {
      setError(TAG_MIN_LENGTH_ERROR)
      return
    }
    if (inputValue.length > 50) {
      setError(TAG_MAX_LENGTH_ERROR)
      return
    }

    updateInternalTags(inputValue)
    setError(null)
    setInputValue('')
  }

  const handleChange = (newValue: string) => {
    if (error) setError(null)
    setInputValue(newValue)
  }

  const handleFinalize = () => {
    updateTags(internalTags)
    toggleModal()
  }

  return (
    <>
    { tags.length > 0  && (
      <>
        <p className="text-center mt-4">Etiquetas:</p>
        <div className="flex flex-col gap-3 md:flex-row">
          { tags.map((tag) => (
            <Badge key={tag} className="max-w-max" color="purple">
              {tag}
            </Badge>
          )) }
        </div>
      </>
    )}
      <Button color="light" onClick={toggleModal}>{subtext} etiquetas</Button>
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
            <form className="flex flex-col gap-4 items-center mt-8">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="tag">Etiqueta</Label>
                </div>
                <TextInput
                  data-testid="tag"
                  id="tag"
                  type="text"
                  value={inputValue}
                  onChange={(e) => handleChange(e.target.value)}
                />
                { error && (
                  <ErrorMessage isAnimated={false}>{error}</ErrorMessage>
                )}
              </div>
              <Button onClick={handleSubmit} className="max-w-max">Agregar etiqueta</Button>
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