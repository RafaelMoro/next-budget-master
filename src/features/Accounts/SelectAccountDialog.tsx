"use client"
import { useSelectAccount } from "@/shared/hooks/useSelectAccount";
import { Modal, ModalBody, ModalHeader } from "flowbite-react"

interface SelectAccountProps {
  openModal: boolean;
  closeModal: () => void;
}

export const SelectAccountDialog = ({ openModal, closeModal }: SelectAccountProps) => {
  const { accountsOptions, handleSelectAccount } = useSelectAccount({ closeModal })

  return (
    <Modal show={openModal} onClose={closeModal}>
      <ModalHeader>Seleccione su cuenta:</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          { accountsOptions.map((acc) => (
            <button
              className="p-4 flex flex-between cursor-crosshair"
              onClick={() => handleSelectAccount(acc.accountId)}
              key={acc.accountId}
            >
              {acc.name}
              {acc.amount}
            </button>
          )) }
        </div>
      </ModalBody>
    </Modal>
  )
}