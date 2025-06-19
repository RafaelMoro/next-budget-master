"use client"
import { useState } from "react";
import { Button, DropdownItem, Modal } from "flowbite-react";
import { RiAddLine } from "@remixicon/react";
import { CreateAccount } from "./CreateAccount";

interface CreateAccButtonProps {
  isOptionElement?: boolean;
}

export const CreateAccButton = ({ isOptionElement }: CreateAccButtonProps) => {
  const [openCreateAccModal, setOpenCreateAccModal] = useState<boolean>(false);
  const toggleModal = () => setOpenCreateAccModal((prev) => !prev);

  if (isOptionElement) {
    return (
      <>
        <DropdownItem data-testid="create-acc-option" className="flex justify-between" onClick={toggleModal} key="create-acc-option">
          <div className="flex gap-1 items-start">
            <RiAddLine />
            <span>Crear cuenta</span>
          </div>
        </DropdownItem>
        <Modal show={openCreateAccModal} onClose={toggleModal}>
          <CreateAccount closeModal={toggleModal} />
        </Modal>
      </>
    )
  }

  return (
    <>
      <Button onClick={() => setOpenCreateAccModal(true)}>
        <RiAddLine />
        Crear cuenta
      </Button>
      <Modal show={openCreateAccModal} onClose={toggleModal}>
        <CreateAccount closeModal={toggleModal} />
      </Modal>
    </>
  )
}