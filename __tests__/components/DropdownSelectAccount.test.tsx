import { render, screen } from '@testing-library/react';
import { DropdownSelectAccount } from '@/features/Accounts/DropdownSelectAccount';
import { AppRouterContextProviderMock } from '@/shared/ui/organisms/AppRouterContextProviderMock';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const mockAccounts = [
  {
    _id: '1',
    title: 'Santander',
    accountType: 'Credito',
    backgroundColor: '',
    color: '',
    amount: 12640.54,
    sub: '',
    accountProvider: 'mastercard',
  },
  {
    _id: '2',
    title: 'HSBC oro',
    accountType: 'Credito',
    backgroundColor: '',
    color: '',
    amount: 24780.08,
    sub: '',
    accountProvider: 'visa',
  },
];

jest.mock('next/headers', () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(() => ({ ftk_sba: null })),
    set: jest.fn(),
  })),
}));

describe('DropdownSelectAccount', () => {
  it('Show the dropdown select account with the first account info', async () => {
    render(
      <DropdownSelectAccount accounts={mockAccounts} />
    );
    expect(await screen.findByText('Santander')).toBeInTheDocument();
    expect(screen.getByText('$12,640.54')).toBeInTheDocument();
    expect(screen.getByText('Credito')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-icon')).toBeInTheDocument();
  });

  it('Given a user clicking the dropdown, show the options', async () => {
    const user = userEvent.setup();
    render(
      <DropdownSelectAccount accounts={mockAccounts} />
    );

    expect(await screen.findByText('Santander')).toBeInTheDocument();
    const button = screen.getByTestId('dropdown-icon')
    await user.click(button)
    expect(await screen.findByText('HSBC oro')).toBeInTheDocument();
  });

  it('Given a user selecting other account, show account selected', async () => {
    const user = userEvent.setup();
    render(
      <DropdownSelectAccount accounts={mockAccounts} />
    );

    expect(await screen.findByText('Santander')).toBeInTheDocument();
    const button = screen.getByTestId('dropdown-icon')
    await user.click(button)
    expect(await screen.findByText('HSBC oro')).toBeInTheDocument();
    await user.click(screen.getByText('HSBC oro'));
    expect(await screen.findByText('HSBC oro')).toBeInTheDocument();
    expect(screen.queryByText('Santander')).not.toBeInTheDocument();
  });

  it.skip('calls saveAccountApi and updates selected account when an option is clicked', async () => {
    const user = userEvent.setup();
    const { findAllByTestId, findByText } = screen;
    render(
      <AppRouterContextProviderMock router={{}}>
        <DropdownSelectAccount accounts={mockAccounts} />
      </AppRouterContextProviderMock>
    );
    const items = await findAllByTestId('dropdown-item');
    await user.click(items[0]);
    expect(await findByText('HSBC oro')).toBeInTheDocument();
  });
});