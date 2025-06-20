import { useState } from "react"
import { OverviewButtonGroup } from "../../Overview/OverviewButtonGroup"
import { OverviewScreens } from "@/shared/types/dashboard.types"
import { StatisticsSubscreen } from "./subscreens/StatisticsSubscreen"
import { BankMovement } from "@/shared/types/records.types"

interface OverViewScreenProps {
  records: BankMovement[];
  message: string | null;
}

export const OverviewScreen = ({ records, message }: OverViewScreenProps) => {
  const [screen, setScreen] = useState<OverviewScreens>('statistics')
  const updateScreen = (newScreen: OverviewScreens) => setScreen(newScreen)

  return (
    <main className="w-full pl-4 pt-4 min-w-xl mt-3 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3 mb-5">Panorama general</h1>
      <OverviewButtonGroup
        updateStatisticsScreen={() => updateScreen('statistics')}
        updateAccountScreen={() => updateScreen('accountInfo')}
        screen={screen}
      />
      { screen === 'statistics' && (<StatisticsSubscreen records={records} message={message} />)}
      { screen === 'accountInfo' && (<p>Informacion de la cuenta</p>)}
    </main>
  )
}