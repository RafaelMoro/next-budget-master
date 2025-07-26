import { BankMovement } from "@/shared/types/records.types"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react"

interface DeleteRecordModalProps {
  open: boolean
  toggleDrawer: () => void
  record: BankMovement
}

export const DeleteRecordModal = ({ record, open, toggleDrawer }: DeleteRecordModalProps) => {
  console.log('open modal', open)
  return (
    <Modal show={open} onClose={toggleDrawer}>
      <ModalHeader>Eliminar {record.shortName}</ModalHeader>
      <ModalBody>
        <p>¿Estás seguro de que deseas eliminar esta transacción?</p>
        <p>Esta acción no puede deshacerse.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="red" outline onClick={toggleDrawer}>Cancelar</Button>
        <Button>Eliminar</Button>
      </ModalFooter>
    </Modal>
  )
}