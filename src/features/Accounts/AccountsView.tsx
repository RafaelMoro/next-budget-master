"use client"
import { Account } from "./Accounts";
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider";
import { useAccountModal } from "@/hooks/useAccountModal";
import { AccountDialog } from "./AccountDialog";

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
    <section data-testid="accounts-view-section" className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      { accountsDisplay.map((acc) => (
        <Account
          key={acc.accountId}
          account={acc}
          openModal={openModal}
        />
      )) }
      <AccountDialog
        accDetails={accDetails}
        openAccModal={openAccModal}
        accAction={accAction}
        closeModal={closeModal}
        updateAccAction={updateAccAction}
      />
    </section>
  )
  
}