import { Dashboard } from "@/features/Dashboard/Dashboard"
import { DashboardStoreProvider } from "@/zustand/provider/dashboard-store-provider"
import { mockAccounts } from "../../mocks/accounts.mock"
import { render, screen } from "@testing-library/react"

const DashboardWrapper = () => {
  return (
    <DashboardStoreProvider accounts={mockAccounts} records={[]} selectedAccountId={mockAccounts[0]._id}>
      <Dashboard detailedError={null} accountsFetched={mockAccounts} />
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
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  it('Show Dashboard', async () => {
    render(<DashboardWrapper />)

    expect(await screen.findByRole('heading', { name: /Panorama general/i })).toBeInTheDocument()
  })
})