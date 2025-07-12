import { render, screen } from "@testing-library/react"

import { DashboardStoreProvider } from "@/zustand/provider/dashboard-store-provider"
import { AccountOverviewSubscreen } from "@/features/Dashboard/Overview/subscreens/AccountOverviewSubscreen"
import { mockAccounts } from "../../../mocks/accounts.mock"
import { recordMock } from "../../../mocks/records.mock"
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock"

describe('AccountOverviewSubscreen', () => {
  it('Show account overview with correct data', () => {
    const push = jest.fn()
    render(
      <DashboardStoreProvider accounts={mockAccounts} records={[recordMock]} selectedAccountId={mockAccounts[0]._id}>
        <AppRouterContextProviderMock router={{ push }}>
          <AccountOverviewSubscreen />
        </AppRouterContextProviderMock>
      </DashboardStoreProvider>
    )

    expect(screen.getByText('Santander')).toBeInTheDocument()
    expect(screen.getByText('$12,640.54')).toBeInTheDocument()
    expect(screen.getByText('Este mes')).toBeInTheDocument()
    expect(screen.getByText("Arby's burger y papas")).toBeInTheDocument()
    expect(screen.getByText('Sin pagar')).toBeInTheDocument()
  })
})