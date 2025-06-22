import { AccountDialog } from "@/features/Accounts/AccountDialog";
import { Account } from "@/features/Accounts/Accounts";
import { MonthAccordionRecords } from "@/features/Records/CurrentMonthAccordionRecords";
import { useAccountModal } from "@/hooks/useAccountModal";
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider";

/**
 * This subscreen shows the overview of the account with it's information and records
 * @param param0 
 * @returns 
 */
export const AccountOverviewSubscreen = () => {
  const { records, selectedAccountDisplay } = useDashboardStore(
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

  return (
    <section className="w-full mt-9 flex flex-col gap-5 items-center justify-center">
      { selectedAccountDisplay && (
        <Account
          account={selectedAccountDisplay}
          openModal={openModal}
        />
      )}
      <AccountDialog
        accDetails={accDetails}
        openAccModal={openAccModal}
        accAction={accAction}
        closeModal={closeModal}
        updateAccAction={updateAccAction}
      />
      <MonthAccordionRecords records={records} title="Este mes" />
    </section>
  )
}