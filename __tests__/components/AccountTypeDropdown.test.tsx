import { render, screen } from "@testing-library/react"
import { useState } from "react"
import { AccountTypeDropdown } from "@/features/Accounts/AccountTypeDropdown"
import { AccountTypes } from "@/shared/types/accounts.types"

const AccountTypeDropdownWrapper = () => {
  const [selectedAccountType, setSelectedAccountType] = useState<AccountTypes>("Crédito")
  const changeSelectedAccountType = (newAccType: AccountTypes) => setSelectedAccountType(newAccType)

  return (
    <AccountTypeDropdown selectedAccountType={selectedAccountType} changeSelectedAccountType={changeSelectedAccountType} />
  )
}

describe('AccountTypeDropdown', () => {
  it('Given the default as credit, show dropdown with that option', () => {
      render(<AccountTypeDropdownWrapper />)
  
      expect(screen.getByText('Tipo de cuenta: Crédito')).toBeInTheDocument()
    })
})