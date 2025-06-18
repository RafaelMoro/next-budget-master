import { render, screen } from "@testing-library/react"
import { useState } from "react"
import userEvent from '@testing-library/user-event';

import { AccountProviderDropdown } from "@/features/Accounts/AccountProviderDropdown"
import { AccountProvider } from "@/shared/types/accounts.types"

const AccountProviderDropdownWrapper = ({
  provider = 'mastercard'
}: { provider?: AccountProvider }) => {
  const [selectedProvider, setSelectedProvider] = useState<AccountProvider>(provider)
  const changeSelectedProviderType = (newProvider: AccountProvider) => setSelectedProvider(newProvider)

  return (
    <AccountProviderDropdown selectedProvider={selectedProvider} changeSelectedProviderType={changeSelectedProviderType}  />
  )
}

describe('AccountProviderDropdown', () => {
  it('Given a default provider as mastercard, Show dropdown with provider mastercard', () => {
    render(<AccountProviderDropdownWrapper />)

    expect(screen.getByText('Proveedor: Mastercard')).toBeInTheDocument()
  })

  it('Given a default provider as visa, Show dropdown with provider visa', () => {
    render(<AccountProviderDropdownWrapper provider="visa" />)

    expect(screen.getByText('Proveedor: Visa')).toBeInTheDocument()
  })

  it('Given a default provider as american-express, Show dropdown with provider american-express', () => {
    render(<AccountProviderDropdownWrapper provider="american-express" />)

    expect(screen.getByText('Proveedor: American Express')).toBeInTheDocument()
  })

  it('Given a user selecting other provider, expect to see new value in dropdown', async () => {
    const user = userEvent.setup();
    render(<AccountProviderDropdownWrapper />)

    const button = screen.getByRole('button', { name: 'Proveedor: Mastercard' })
    await user.click(button)
    const dropdownItem = screen.getByRole('button', { name: 'Visa' })
    await user.click(dropdownItem)
    expect(screen.getByText('Proveedor: Visa')).toBeInTheDocument()
  })
})