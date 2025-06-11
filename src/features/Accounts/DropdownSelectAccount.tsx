import { ReactElement } from "react"
import { Dropdown, DropdownItem } from "flowbite-react"

interface DropdownSelectAccountProps {
  customElement: () => ReactElement
}

export const DropdownSelectAccount = ({ customElement }: DropdownSelectAccountProps) => {
  return (
    <Dropdown label="" renderTrigger={customElement}>
      <DropdownItem>HSBC Clasica</DropdownItem>
      <DropdownItem>Santander</DropdownItem>
    </Dropdown>
  )
}