import { BankMovement, DeleteExpenseDataResponse, DeleteExpenseErrorResponse, DeleteRecordPayload } from "@/shared/types/records.types"
import { deleteExpenseCb } from "@/shared/utils/records.utils"
import { useMutation } from "@tanstack/react-query"
import { Button, CheckIcon, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "flowbite-react"
import { useRouter } from "next/navigation"

interface DeleteRecordModalProps {
  open: boolean
  toggleModal: () => void
  handleCloseDrawer: () => void;
  record: BankMovement
}

export const DeleteRecordModal = ({ record, open, toggleModal, handleCloseDrawer }: DeleteRecordModalProps) => {
  const router = useRouter()

  const { mutate: deleteExpense, isError, isPending, isSuccess, error } = useMutation<DeleteExpenseDataResponse
  , DeleteExpenseErrorResponse, DeleteRecordPayload>({
    mutationFn: deleteExpenseCb,
    onSuccess: () => {
      router.refresh()
      setTimeout(() => {
        toggleModal()
        handleCloseDrawer()
      }, 1000)
    }
  })
  const handleDeleteRecord = () => {
    // TODO: Add condition for Income records
    // TODO: Add condition for transfer records
    deleteExpense({ recordId: record._id })
  }

  return (
    <Modal show={open} onClose={toggleModal}>
      <ModalHeader>Eliminar {record.shortName}</ModalHeader>
      <ModalBody>
        <p>¿Estás seguro de que deseas eliminar esta transacción?</p>
        <p>Esta acción no puede deshacerse.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="red" outline onClick={toggleModal}>Cancelar</Button>
        <Button onClick={handleDeleteRecord}>
          { isPending ? (
            <Spinner aria-label="loading delete record budget master" />
          ) : isSuccess ? (
            <CheckIcon data-testid="check-icon" />
          ) : 'Eliminar' }
        </Button>
      </ModalFooter>
    </Modal>
  )
}