import { useState } from "react"
import { OverviewButtonGroup } from "../../Overview/OverviewButtonGroup"
import { OverviewScreens } from "@/shared/types/dashboard.types"
import { StatisticsSubscreen } from "./subscreens/StatisticsSubscreen"
import { BankMovement } from "@/shared/types/records.types"
import { AccountOverviewSubscreen } from "./subscreens/AccountOverviewSubscreen"
import { AccountBank } from "@/shared/types/accounts.types"

interface OverViewScreenProps {
  records: BankMovement[];
  accounts: AccountBank[];
  selectedAccountId: string | null
  message: string | null;
}

export const OverviewScreen = ({ records, message, accounts, selectedAccountId }: OverViewScreenProps) => {
  const [subscreen, setSubscreen] = useState<OverviewScreens>('statistics')
  const updateSubscreen = (newScreen: OverviewScreens) => setSubscreen(newScreen)

  return (
    <main className="w-full pl-4 pt-4 min-w-xl mt-3 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3 mb-5">Panorama general</h1>
      <OverviewButtonGroup
        updateStatisticsScreen={() => updateSubscreen('statistics')}
        updateAccountScreen={() => updateSubscreen('accountInfo')}
        screen={subscreen}
      />
      { subscreen === 'statistics' && (<StatisticsSubscreen records={records} message={message} />)}
      { subscreen === 'accountInfo' && (<AccountOverviewSubscreen accounts={accounts} selectedAccountId={selectedAccountId} records={records} />)}
    </main>
  )
}