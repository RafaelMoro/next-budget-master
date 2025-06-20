import { Button, ButtonGroup } from "flowbite-react"
import { RiLineChartLine } from "@remixicon/react"
import { CreditCardIcon } from "@/shared/ui/icons/CreditCardIcon"

export const OverviewButtonGroup = () => {
  return (
    <ButtonGroup>
      <Button color="alternative">
        <RiLineChartLine className="me-2 h-4 w-4" />
        Estadísticas
      </Button>
      <Button color="alternative">
        <CreditCardIcon className="me-2 h-4 w-4" />
        Información general de la cuenta
      </Button>
    </ButtonGroup>
  )
}