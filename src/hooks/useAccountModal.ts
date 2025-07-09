import { AccountModalAction, AccountsDisplay } from "@/shared/types/accounts.types"
import { useState } from "react"

/**
 * This hook is to use Account and a modal for AccountDetails, EditAccount, DeleteAccount
 * @returns state and functions to handle state of the account modal
 */
export const useAccountModal = () => {
  const [openAccModal, setOpenAccModal] = useState<boolean>(false)
  const [accDetails, setAccDetails] = useState<AccountsDisplay | null>(null)
  const [accAction, setAccAction] = useState<AccountModalAction | null>(null)
  const toggleAccModal = () => setOpenAccModal((prev) => !prev)

  const openModal = (acc: AccountsDisplay) => {
    toggleAccModal()
    setAccAction('view')
    setAccDetails(acc)
  }
  const closeModal = () => {
    toggleAccModal()
    setAccAction(null)
    setAccDetails(null)
  }
  const updateAccAction = (acc: AccountModalAction) => {
    setAccAction(acc)
  }

  return {
    openAccModal,
    accDetails,
    accAction,
    openModal,
    closeModal,
    updateAccAction
  }
}