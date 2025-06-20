import { Button, ButtonGroup } from "flowbite-react"
import { RiLineChartLine } from "@remixicon/react"
import { CreditCardIcon } from "@/shared/ui/icons/CreditCardIcon"

interface OverviewButtonGroupProps {
  updateStatisticsScreen: () => void
  updateAccountScreen: () => void
}

export const OverviewButtonGroup = ({ updateStatisticsScreen, updateAccountScreen }: OverviewButtonGroupProps) => {
  return (
    <div className="w-full flex justify-center">
      <ButtonGroup>
        <Button onClick={updateStatisticsScreen} color="alternative">
          <RiLineChartLine className="me-2 h-4 w-4" />
          Estadísticas
        </Button>
        <Button onClick={updateAccountScreen} color="alternative">
          <CreditCardIcon className="me-2 h-4 w-4" />
          Información general de la cuenta
        </Button>
      </ButtonGroup>
    </div>
  )
}