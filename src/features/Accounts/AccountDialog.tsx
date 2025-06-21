import { AccountModalAction, AccountsDisplay } from "@/shared/types/accounts.types"
import { Modal } from "flowbite-react"
import { AccountDetails } from "./AccountDetails"
import { EditAccount } from "./EditAccount"
import { DeleteAccount } from "./DeleteAccount"

interface AccountDialogProps {
  accDetails: AccountsDisplay | null
  openAccModal: boolean
  accAction: AccountModalAction | null
  closeModal: () => void
  updateAccAction: (acc: AccountModalAction) => void
}

export const AccountDialog = ({
  accDetails, closeModal, openAccModal, accAction, updateAccAction
}: AccountDialogProps) => {
  if (accDetails) {
    return (
      <Modal show={openAccModal} onClose={closeModal}>
      { accAction === 'view' && (
        <AccountDetails
          account={accDetails}
          updateAccAction={updateAccAction}
        />
      )}
      { accAction === 'edit' && (
        <EditAccount
          account={accDetails}
          closeModal={closeModal}
          updateAccAction={updateAccAction}
        />
      )}

      { accAction === 'delete' && (
        <DeleteAccount
          account={accDetails}
          closeModal={closeModal}
          updateAccAction={updateAccAction}
        />
      )}
    </Modal>
    )
  }
  return null
}