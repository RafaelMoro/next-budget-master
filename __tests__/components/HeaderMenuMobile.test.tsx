import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HeaderMenuMobile } from '@/shared/ui/atoms/HeaderMenuMobile';
import { mockAccounts } from '@/../__tests__/mocks/accounts.mock';
import { recordMock } from '@/../__tests__/mocks/records.mock';
import { DashboardStoreProvider } from '@/zustand/provider/dashboard-store-provider';
import { QueryProviderWrapper } from '@/app/QueryProviderWrapper';
import { AppRouterContextProviderMock } from '@/shared/ui/organisms/AppRouterContextProviderMock';
import { DashboardScreens } from '@/shared/types/dashboard.types';

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

const HeaderMenuMobileWrapper = ({ push, updateScreen, toggleSelectAccountModal }: {
  push: () => void
  updateScreen: (screen: DashboardScreens) => void
  toggleSelectAccountModal: () => void
}) => {
  return (
    <DashboardStoreProvider {...dashboardStoreProps}>
        <QueryProviderWrapper>
          <AppRouterContextProviderMock router={{ push }}>
            <HeaderMenuMobile
              accounts={mockAccounts}
              updateScreen={updateScreen}
              toggleSelectAccountModal={toggleSelectAccountModal}
              screen={null}
            />
          </AppRouterContextProviderMock>
        </QueryProviderWrapper>
      </DashboardStoreProvider>
  )
}

describe('HeaderMenuMobile', () => {
  const updateScreen = jest.fn();
  const toggleSelectAccountModal = jest.fn();
  const push = jest.fn();

  it('renders menu button and opens drawer on click', async () => {
    const user = userEvent.setup();
    render(
      <HeaderMenuMobileWrapper
        push={push}
        updateScreen={updateScreen}
        toggleSelectAccountModal={toggleSelectAccountModal}
      />
    );
    // Menu button should be present (first button)
    const menuButton = screen.getAllByRole('button')[0];
    expect(menuButton).toBeInTheDocument();
    // Click to open drawer
    await user.click(menuButton);
    // Drawer should open and show the menu title as heading
    expect(screen.getByRole('heading', { name: /menu/i })).toBeInTheDocument();
  });

  it('renders account dropdown if accounts are present', async () => {
    const user = userEvent.setup();
    render(
      <HeaderMenuMobileWrapper
        push={push}
        updateScreen={updateScreen}
        toggleSelectAccountModal={toggleSelectAccountModal}
      />
    );
    await user.click(screen.getAllByRole('button')[0]);
    // Should render the account name in the dropdown
    expect(screen.getByText('Santander')).toBeInTheDocument();
  });

  it('calls updateScreen when a menu link is clicked', async () => {
    const user = userEvent.setup();
    render(
      <HeaderMenuMobileWrapper
        push={push}
        updateScreen={updateScreen}
        toggleSelectAccountModal={toggleSelectAccountModal}
      />
    );
    await user.click(screen.getAllByRole('button')[0]);
    // Click the 'Cuentas' menu link
    const cuentasBtn = screen.getByText(/cuentas/i);
    await user.click(cuentasBtn);
    expect(updateScreen).toHaveBeenCalledWith('accounts');
  });
});
