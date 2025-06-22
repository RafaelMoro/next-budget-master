import { render, screen } from "@testing-library/react"
import { AccountsView } from "@/features/Accounts/AccountsView"
import { AccountBank } from "@/shared/types/accounts.types"
import { DashboardStoreProvider } from "@/zustand/provider/dashboard-store-provider"

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
    render(
      <DashboardStoreProvider accounts={[account]} records={[]} selectedAccountId={account._id}>
        <AccountsView/>
      </DashboardStoreProvider>
    )

    expect(screen.getByText('Santander')).toBeInTheDocument()
    expect(screen.getByText('$12,640.54')).toBeInTheDocument()
    expect(screen.getByText(/Credito/i)).toBeInTheDocument()
    expect(screen.getByAltText('Account Provider Logo')).toBeInTheDocument()
  })

  it('Show nothing if accounts is empty', () => {
    render(
      <DashboardStoreProvider accounts={[]} records={[]} selectedAccountId={''}>
        <AccountsView/>
      </DashboardStoreProvider>
    )

    expect(screen.queryByTestId('accounts-view-section')).not.toBeInTheDocument()
  })

  it('Given an account with no account provider, show mastercard as default', () => {
    const account: AccountBank = {
      _id: '1',
      title: 'Santander',
      amount: 12640.54,
      accountType: 'Credito',
      backgroundColor: 'blue',
      color: 'white',
      sub: '123-456'
    }
    render(
      <DashboardStoreProvider accounts={[account]} records={[]} selectedAccountId={account._id}>
        <AccountsView/>
      </DashboardStoreProvider>
    )

    expect(screen.getByAltText('Account Provider Logo')).toBeInTheDocument()
  })
})