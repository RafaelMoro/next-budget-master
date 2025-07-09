"use client"
import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { RiAddLine } from "@remixicon/react";
import { CreateAccount } from "./CreateAccount";

export const CreateAccButton = () => {
  const [openCreateAccModal, setOpenCreateAccModal] = useState<boolean>(false);
  const toggleModal = () => setOpenCreateAccModal((prev) => !prev);

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