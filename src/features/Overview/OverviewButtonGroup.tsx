import { Button, ButtonGroup } from "flowbite-react"
import { RiLineChartLine } from "@remixicon/react"
import clsx from "clsx"

import { CreditCardIcon } from "@/shared/ui/icons/CreditCardIcon"
import { OverviewScreens } from "@/shared/types/dashboard.types"

interface OverviewButtonGroupProps {
  updateStatisticsScreen: () => void
  updateAccountScreen: () => void
  screen: OverviewScreens
}

export const OverviewButtonGroup = ({ updateStatisticsScreen, updateAccountScreen, screen }: OverviewButtonGroupProps) => {
  const isStatisticsScreen = screen === 'statistics'
  const cssClassStatistics = clsx(
    { "dark:text-primary-700": isStatisticsScreen },
    { "dark:text-gray-400": !isStatisticsScreen },
    "relative flex items-center justify-center text-center font-medium focus:outline-none h-10 px-5 text-sm border border-gray-200",
    "hover:bg-gray-100 hover:text-primary-700 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800",
    "dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 rounded-none border-l-0 first:rounded-s-lg first:border-l",
    "last:rounded-e-lg focus:ring-2",
  )
  console.log('isStatisticsScreen', isStatisticsScreen)
  const cssClassAccount = clsx({ "dark:text-indigo-400": screen === 'accountInfo' })

  return (
    <div className="w-full flex justify-center">
      <ButtonGroup>
        <button
          // className="text-blue-600 bg-blue-400"
          className={cssClassStatistics}
          onClick={updateStatisticsScreen} color="alternative"
        >
          <RiLineChartLine className="me-2 h-4 w-4" />
          Estadísticas
        </button>
        <Button className={cssClassAccount} onClick={updateAccountScreen} color="alternative">
          <CreditCardIcon className="me-2 h-4 w-4" />
          Información general de la cuenta
        </Button>
      </ButtonGroup>
    </div>
  )
}