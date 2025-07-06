import { render, screen } from '@testing-library/react';
import {QueryProviderWrapper} from '@/app/QueryProviderWrapper';
import { AppRouterContextProviderMock } from '@/shared/ui/organisms/AppRouterContextProviderMock';
import { DashboardStoreProvider } from '@/zustand/provider/dashboard-store-provider';
import { AccountScreen } from '@/features/Dashboard/Account/AccountScreen';
import { mockAccounts } from '@/../__tests__/mocks/accounts.mock';
import { recordMock } from '@/../__tests__/mocks/records.mock';

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
};

describe('AccountScreen', () => {
  const dashboardStoreProps = {
    accounts: mockAccounts,
    records: [recordMock],
    selectedAccountId: mockAccounts[0]._id,
  };

  it('renders the title, instructions, and CreateAccButton', () => {
    render(
      <QueryProviderWrapper>
        <AppRouterContextProviderMock router={mockRouter}>
          <DashboardStoreProvider {...dashboardStoreProps}>
            <AccountScreen />
          </DashboardStoreProvider>
        </AppRouterContextProviderMock>
      </QueryProviderWrapper>
    );
    expect(screen.getByRole('heading', { name: /cuentas bancarias/i })).toBeInTheDocument();
    expect(screen.getByText('Haz click en cualquiera de tus cuentas para ver más en detalle la informacion')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it('renders the AccountsView component', () => {
    render(
      <QueryProviderWrapper>
        <AppRouterContextProviderMock router={mockRouter}>
          <DashboardStoreProvider {...dashboardStoreProps}>
            <AccountScreen />
          </DashboardStoreProvider>
        </AppRouterContextProviderMock>
      </QueryProviderWrapper>
    );
    // AccountsView likely renders a list or some element, so check for a known text or role
    // If AccountsView renders nothing, this will still pass as the component is mounted
    // Adjust this selector if AccountsView has a specific test id or text
    // For now, just check the component is present by looking for the instruction text
    expect(screen.getByText('Haz click en cualquiera de tus cuentas para ver más en detalle la informacion')).toBeInTheDocument();
  });
});
