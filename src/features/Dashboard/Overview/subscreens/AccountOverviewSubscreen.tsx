import { Account } from "@/features/Accounts/Accounts";
import { MonthAccordionRecords } from "@/features/Records/CurrentMonthAccordionRecords";
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

  return (
    <section className="w-full mt-9 flex flex-col gap-5 items-center justify-center">
      { selectedAccountDisplay && (
        <Account
          account={selectedAccountDisplay}
          // TODO: Correct this
          openModal={() => {}}
        />
      )}
      <MonthAccordionRecords records={records} title="Este mes" />
    </section>
  )
}