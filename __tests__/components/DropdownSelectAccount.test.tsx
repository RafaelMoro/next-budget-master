import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { DropdownSelectAccount } from '@/features/Accounts/DropdownSelectAccount';
import { DashboardStoreProvider } from '@/zustand/provider/dashboard-store-provider';
import { mockAccounts } from '../mocks/accounts.mock';

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ ftk_sba: null })),
    set: jest.fn(),
  })),
}));

function mockFetch() {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      message: "Selected account saved",
      success: true
    }),
  );
}

describe('DropdownSelectAccount', () => {
  beforeEach(() => {
    render(
      <DashboardStoreProvider accounts={mockAccounts} records={[]} selectedAccountId={mockAccounts[0]._id}>
        <DropdownSelectAccount />
      </DashboardStoreProvider>
    );
  })
  // Ommited the test with cookie set with different account as the mock of the get cookie does not work properly
  it('Show the dropdown select account with the first account info', async () => {
    
    expect(await screen.findByText('Santander')).toBeInTheDocument();
    expect(screen.getByText('$12,640.54')).toBeInTheDocument();
    expect(screen.getByText('Credito')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-icon')).toBeInTheDocument();
  });

  it('Given a user clicking the dropdown, show the options', async () => {
    const user = userEvent.setup();

    expect(await screen.findByText('Santander')).toBeInTheDocument();
    const button = screen.getByTestId('dropdown-icon')
    await user.click(button)
    expect(await screen.findByText('HSBC oro')).toBeInTheDocument();
  });

  it('Given a user selecting other account, show account selected', async () => {
    window.fetch = mockFetch()
    const user = userEvent.setup();

    expect(await screen.findByText('Santander')).toBeInTheDocument();
    const button = screen.getByTestId('dropdown-icon')
    await user.click(button)
    expect(await screen.findByText('HSBC oro')).toBeInTheDocument();
    await user.click(screen.getByText('HSBC oro'));
    expect(await screen.findByText('HSBC oro')).toBeInTheDocument();
    expect(screen.queryByText('Santander')).not.toBeInTheDocument();
  });
});