import { AccountDialog } from "@/features/Accounts/AccountDialog";
import { Account } from "@/features/Accounts/Accounts";
import { MonthAccordionRecords } from "@/features/Records/CurrentMonthAccordionRecords";
import { useAccountModal } from "@/hooks/useAccountModal";
import { CREATE_RECORD_ROUTE } from "@/shared/constants/Global.constants";
import { LinkButton } from "@/shared/ui/atoms/LinkButton";
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
      { records.length > 0 && (
        <LinkButton text="Registrar movimiento" href={CREATE_RECORD_ROUTE} />
      ) }
      <MonthAccordionRecords records={records} title="Este mes" />
    </section>
  )
}