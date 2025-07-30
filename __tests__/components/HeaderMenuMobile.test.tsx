import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderMenuMobile } from '@/shared/ui/atoms/HeaderMenuMobile';
import { mockAccounts } from '@/../__tests__/mocks/accounts.mock';
import { recordMock } from '@/../__tests__/mocks/records.mock';
import { DashboardStoreProvider } from '@/zustand/provider/dashboard-store-provider';
import { QueryProviderWrapper } from '@/app/QueryProviderWrapper';

// Mock next/headers cookies for Next.js API usage in tests
jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ session: 'session-mock' })),
    set: jest.fn(),
  })),
}));

const dashboardStoreProps = {
  accounts: mockAccounts,
  records: [recordMock],
  selectedAccountId: mockAccounts[0]._id,
};

describe('HeaderMenuMobile', () => {
  const updateScreen = jest.fn();
  const toggleSelectAccountModal = jest.fn();

  it('renders menu button and opens drawer on click', () => {
    render(
      <DashboardStoreProvider {...dashboardStoreProps}>
        <QueryProviderWrapper>
          <HeaderMenuMobile
            accounts={mockAccounts}
            updateScreen={updateScreen}
            toggleSelectAccountModal={toggleSelectAccountModal}
            screen={null}
          />
        </QueryProviderWrapper>
      </DashboardStoreProvider>
    );
    // Menu button should be present (first button)
    const menuButton = screen.getAllByRole('button')[0];
    expect(menuButton).toBeInTheDocument();
    // Click to open drawer
    fireEvent.click(menuButton);
    // Drawer should open and show the menu title as heading
    expect(screen.getByRole('heading', { name: /menu/i })).toBeInTheDocument();
  });

  it('renders account dropdown if accounts are present', () => {
    render(
      <DashboardStoreProvider {...dashboardStoreProps}>
        <QueryProviderWrapper>
          <HeaderMenuMobile
            accounts={mockAccounts}
            updateScreen={updateScreen}
            toggleSelectAccountModal={toggleSelectAccountModal}
            screen={null}
          />
        </QueryProviderWrapper>
      </DashboardStoreProvider>
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    // Should render the account name in the dropdown
    expect(screen.getByText('Santander')).toBeInTheDocument();
  });

  it('calls updateScreen when a menu link is clicked', () => {
    render(
      <DashboardStoreProvider {...dashboardStoreProps}>
        <QueryProviderWrapper>
          <HeaderMenuMobile
            accounts={mockAccounts}
            updateScreen={updateScreen}
            toggleSelectAccountModal={toggleSelectAccountModal}
            screen={null}
          />
        </QueryProviderWrapper>
      </DashboardStoreProvider>
    );
    fireEvent.click(screen.getAllByRole('button')[0]);
    // Click the 'Cuentas' menu link
    const cuentasBtn = screen.getByText(/cuentas/i);
    fireEvent.click(cuentasBtn);
    expect(updateScreen).toHaveBeenCalledWith('accounts');
  });
});
