import { useState } from "react"
import { OverviewButtonGroup } from "../Overview/OverviewButtonGroup"
import { OverviewScreens } from "@/shared/types/dashboard.types"

export const OverviewScreen = () => {
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
      { screen === 'statistics' && (<p>Estafisticas</p>)}
      { screen === 'accountInfo' && (<p>Informacion de la cuenta</p>)}
    </main>
  )
}