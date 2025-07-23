import { AccountTransfer } from "@/shared/types/accounts.types"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"
import { RiArrowDownSLine } from "@remixicon/react"
import { Button, Dropdown, DropdownItem } from "flowbite-react"

interface TransferAccountsSelectorProps {
  isPending: boolean
  origin: AccountTransfer | null
  destination: AccountTransfer | null
  accountsFormatted: AccountTransfer[]
  destinationAccounts: AccountTransfer[]
  destinationError: string | null
  updateOrigin: (account: AccountTransfer) => void
  updateDestination: (account: AccountTransfer) => void
}

export const TransferAccountsSelector = ({
  origin, destination, isPending, destinationError, accountsFormatted, destinationAccounts, updateOrigin, updateDestination
}: TransferAccountsSelectorProps) => {
  return (
    <>
    <Dropdown label="" renderTrigger={() => (
      <Button disabled={isPending} data-testid="select-origin-dropdown-button" color="light">
        { isPending ? 'Cargando...' : `Origen: ${origin?.name}` }
        <RiArrowDownSLine />
      </Button>
    )}>
      { accountsFormatted.map((acc) => (
        <DropdownItem
          onClick={() => updateOrigin(acc)}
          value={acc.accountId}
          key={acc.accountId}
        >{acc.name}</DropdownItem>
      ))}
    </Dropdown>
    <Dropdown label="" renderTrigger={() => (
      <Button disabled={isPending} data-testid="select-destination-dropdown-button" color="light">
        { isPending ? 'Cargando...' : `Destino: ${destination?.name ?? ''}` }
        <RiArrowDownSLine />
      </Button>
    )}>
      { destinationAccounts.map((acc) => (
        <DropdownItem
          onClick={() => updateDestination(acc)}
          value={acc.accountId}
          key={acc.accountId}
        >{acc.name}</DropdownItem>
      ))}
    </Dropdown>
    { destinationError && (
      <ErrorMessage isAnimated>{destinationError}</ErrorMessage>
    )}
    </>
  )
}