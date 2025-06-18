import { render, screen } from "@testing-library/react"
import { useState } from "react"
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

    expect(screen.getByText('Tipo de cuenta: Mastercard')).toBeInTheDocument()
  })

  it('Given a default provider as visa, Show dropdown with provider visa', () => {
    render(<AccountProviderDropdownWrapper provider="visa" />)

    expect(screen.getByText('Tipo de cuenta: Visa')).toBeInTheDocument()
  })

  it('Given a default provider as american-express, Show dropdown with provider american-express', () => {
    render(<AccountProviderDropdownWrapper provider="american-express" />)

    expect(screen.getByText('Tipo de cuenta: American Express')).toBeInTheDocument()
  })
})