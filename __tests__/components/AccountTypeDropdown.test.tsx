import { render, screen } from "@testing-library/react"
import { useState } from "react"
import userEvent from '@testing-library/user-event';

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

  it('Given a user selecting other type of account, expect to see new value in dropdown', async () => {
      const user = userEvent.setup();
      render(<AccountTypeDropdownWrapper />)
  
      const button = screen.getByRole('button', { name: 'Tipo de cuenta: Crédito' })
      await user.click(button)
      const dropdownItem = screen.getByRole('button', { name: 'Vales de comida' })
      await user.click(dropdownItem)
      expect(screen.getByText('Tipo de cuenta: Vales de comida')).toBeInTheDocument()
    })
})