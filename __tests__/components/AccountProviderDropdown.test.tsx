import { render, screen } from "@testing-library/react"
import { useState } from "react"
import { AccountProviderDropdown } from "@/features/Accounts/AccountProviderDropdown"
import { AccountProvider } from "@/shared/types/accounts.types"

const AccountProviderDropdownWrapper = () => {
  const [selectedProvider, setSelectedProvider] = useState<AccountProvider>('mastercard')
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
})