"use client"
import { useState } from "react";
import { AccountModalAction, AccountsDisplay } from "@/shared/types/accounts.types";
import { Account } from "./Accounts";
import { Modal } from "flowbite-react";
import { AccountDetails } from "./AccountDetails";
import { EditAccount } from "./EditAccount";
import { DeleteAccount } from "./DeleteAccount";
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider";
import { useAccountModal } from "@/hooks/useAccountModal";

/**
 * Shows a list of the accounts fetched
 * @param accounts - Accounts fetched 
 * @returns List of accounts with modal to edit, delete the account clicked
 */
export const AccountsView = () => {
  const { accountsDisplay } = useDashboardStore(
    (state) => state
  )
  const {
    openAccModal,
    accDetails,
    accAction,
    openModal,
    closeModal,
    updateAccAction
  } = useAccountModal()

  if (accountsDisplay.length === 0) {
    return null
  }

  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      { accountsDisplay.map((acc) => (
        <Account
          key={acc.accountId}
          account={acc}
          openModal={openModal}
        />
      )) }
      { accDetails && (
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
      ) }
    </section>
  )
  
}