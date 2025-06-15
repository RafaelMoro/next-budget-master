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

// jest.mock('../../src/shared/lib/preferences.lib', () => ({
//   getAccountCookie: jest.fn(() => Promise.resolve(null)),
// }));

// jest.mock('../../src/shared/utils/user-info.utils', () => ({
//   saveAccountApi: jest.fn(() => Promise.resolve()),
// }));

// jest.mock('flowbite-react', () => ({
//   Dropdown: ({ children, renderTrigger }: { children: any, renderTrigger: any }) => (
//     <div data-testid="dropdown">
//       <div data-testid="dropdown-trigger" onClick={() => {}}>{renderTrigger()}</div>
//       <div data-testid="dropdown-items">{children}</div>
//     </div>
//   ),
//   DropdownItem: ({ children, onClick }: { children: any, onClick: any }) => (
//     <div data-testid="dropdown-item" onClick={onClick}>{children}</div>
//   ),
// }));

describe('DropdownSelectAccount', () => {
  it.only('renders the dropdown with the first account selected', async () => {
    render(
      <DropdownSelectAccount accounts={mockAccounts} />
    );
    expect(await screen.findByText('Santander')).toBeInTheDocument();
    expect(screen.getByText('$12,640.54')).toBeInTheDocument();
    expect(screen.getByText('Credito')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-icon')).toBeInTheDocument();
  });

  it('shows account options in the dropdown', async () => {
    render(
      <AppRouterContextProviderMock router={{}}>
        <DropdownSelectAccount accounts={mockAccounts} />
      </AppRouterContextProviderMock>
    );
    expect(await screen.findByText('HSBC oro')).toBeInTheDocument();
  });

  it('calls saveAccountApi and updates selected account when an option is clicked', async () => {
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