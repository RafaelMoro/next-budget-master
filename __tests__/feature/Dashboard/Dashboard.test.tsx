import { Dashboard } from "@/features/Dashboard/Dashboard"
import { DashboardStoreProvider } from "@/zustand/provider/dashboard-store-provider"
import { mockAccounts } from "../../mocks/accounts.mock"
import { render, screen } from "@testing-library/react"
import { AppRouterContextProviderMock } from "@/shared/ui/organisms/AppRouterContextProviderMock"
import { QueryProviderWrapper } from "@/app/QueryProviderWrapper"
import { mockMatchMedia, QueryMatchMedia } from "../../utils-test/record.utils"

const DashboardWrapper = ({ push }: { push: () => void }) => {
  return (
    <DashboardStoreProvider accounts={mockAccounts} records={[]} selectedAccountId={mockAccounts[0]._id}>
      <QueryProviderWrapper>
        <AppRouterContextProviderMock router={{ push }}>
          <Dashboard detailedError={null} accountsFetched={mockAccounts} recordsFetched={[]} />
        </AppRouterContextProviderMock>
      </QueryProviderWrapper>
    </DashboardStoreProvider>
  )
}

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ session: 'session-mock' })),
    set: jest.fn(),
  })),
}));

describe('Dashboard', () => {
  mockMatchMedia({
    [QueryMatchMedia.isMobileTablet]: false,
    [QueryMatchMedia.isDesktop]: false,
  });

  it('Show Dashboard', async () => {
    const push = jest.fn();
    render(<DashboardWrapper push={push} />)

    expect(await screen.findByRole('heading', { name: /Panorama general/i })).toBeInTheDocument()
  })
})