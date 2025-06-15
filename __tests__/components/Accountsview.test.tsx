import { render, screen } from "@testing-library/react"
import { AccountsView } from "@/features/Accounts/AccountsView"
import { AccountBank } from "@/shared/types/accounts.types"

describe('AccountsView', () => {
  it('Show accounts view with 1 account', () => {
    const account: AccountBank = {
      _id: '1',
      title: 'Santander',
      amount: 12640.54,
      accountType: 'Credito',
      accountProvider: 'mastercard',
      backgroundColor: 'blue',
      color: 'white',
      sub: '123-456'
    }
    render(<AccountsView accounts={[account]} />)

    expect(screen.getByText('Santander')).toBeInTheDocument()
    expect(screen.getByText('$12,640.54')).toBeInTheDocument()
    expect(screen.getByText(/Credito/i)).toBeInTheDocument()
    expect(screen.getByAltText('Account Provider Logo')).toBeInTheDocument()
  })
})