import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import { TransferAccountsSelector } from '@/features/Records/Transfer/TransferAccountsSelector';
import { useTransferBankAccounts } from '@/shared/hooks/useTransferBankAccounts';
import { AccountTransfer } from '@/shared/types/accounts.types';
import { QueryProviderWrapper } from '@/app/QueryProviderWrapper';
import { TransactionScreens } from '@/shared/types/dashboard.types';
import { mockAccounts } from '../../../mocks/accounts.mock';

// Mock accounts data for testing
const mockAccountTransfer1: AccountTransfer = {
  accountId: '1',
  name: 'Santander Credit',
  type: 'Crédito'
};

const mockAccountTransfer2: AccountTransfer = {
  accountId: '2',
  name: 'HSBC Debit',
  type: 'Débito'
};

const mockAccountTransfer3: AccountTransfer = {
  accountId: '3',
  name: 'BBVA Savings',
  type: 'Cuenta de ahorro'
};

const mockAccountsFormatted = [mockAccountTransfer1, mockAccountTransfer2, mockAccountTransfer3];

interface TransferAccountsSelectorProps {
  subscreen?: TransactionScreens;
  accessToken?: string;
  selectedAccount?: string | null;
}

const TransferAccountsSelectorWrapper = (props: TransferAccountsSelectorProps) => {
  return (
    <QueryProviderWrapper>
      <TransferAccountsSelectorInner {...props} />
    </QueryProviderWrapper>
  );
};

// Wrapper component that uses the hook and renders TransferAccountsSelector
const TransferAccountsSelectorInner = ({
  subscreen = 'transfer',
  accessToken = 'test-token',
  selectedAccount = null
}: TransferAccountsSelectorProps) => {
  const hookResult = useTransferBankAccounts({ subscreen, accessToken, selectedAccount });

  return (
    <QueryProviderWrapper>
      <TransferAccountsSelector {...hookResult} />
    </QueryProviderWrapper>
  );
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TransferAccountsSelector', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading States', () => {
    it('should show loading state when isPending is true', () => {
      render(<TransferAccountsSelectorWrapper />);

      const loadingTexts = screen.getAllByText('Cargando...')
      expect(loadingTexts).toHaveLength(2); // Both dropdowns show loading
    });

    it('should disable buttons when isPending is true', () => {
      render(<TransferAccountsSelectorWrapper />);

      const originButton = screen.getByTestId('select-origin-dropdown-button');
      const destinationButton = screen.getByTestId('select-destination-dropdown-button');

      expect(originButton).toBeDisabled();
      expect(destinationButton).toBeDisabled();
    });
  });

  describe('Origin Dropdown', () => {
    it('should render origin dropdown with correct initial value', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          data: {
            accounts: mockAccounts
          }
        }
      })
      render(<TransferAccountsSelectorWrapper />);

      expect(await screen.findByText('Origen: Santander')).toBeInTheDocument();
    });

    it('should render all accounts in origin dropdown when clicked', async () => {
      const user = userEvent.setup();
      mockedAxios.get.mockResolvedValue({
        data: {
          data: {
            accounts: mockAccounts
          }
        }
      })
      render(<TransferAccountsSelectorWrapper />);

      const originButton = screen.getByTestId('select-origin-dropdown-button');
      await user.click(originButton);

      expect(screen.getByText('Santander')).toBeInTheDocument();
      expect(screen.getByText('HSBC oro')).toBeInTheDocument();
    });

    it('should call updateOrigin when an origin account is selected', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          data: {
            accounts: mockAccounts
          }
        }
      })
      const user = userEvent.setup();
      render(<TransferAccountsSelectorWrapper />);

      // Wait for the component to load and render initial state
      await screen.findByText('Origen: Santander');

      const originButton = screen.getByTestId('select-origin-dropdown-button');
      await user.click(originButton);

      const hsbc = screen.getByText('HSBC oro');
      await user.click(hsbc);

      // Since we're using the real hook, we can verify the behavior by checking 
      // that the origin has changed in the UI
      expect(await screen.findByText('Origen: HSBC oro')).toBeInTheDocument();
    });
  });

  describe('Destination Dropdown', () => {
    it('should render destination dropdown with empty value initially', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          data: {
            accounts: mockAccounts
          }
        }
      })
      render(<TransferAccountsSelectorWrapper />);

      expect(await screen.findByText('Destino:')).toBeInTheDocument();
    });

    it('should render only available destination accounts (excluding origin)', async () => {
      const user = userEvent.setup();
      mockedAxios.get.mockResolvedValue({
        data: {
          data: {
            accounts: mockAccounts
          }
        }
      })
      render(<TransferAccountsSelectorWrapper />);

      // Wait for accounts to load
      await screen.findByText('Origen: Santander');

      const destinationButton = screen.getByTestId('select-destination-dropdown-button');
      await user.click(destinationButton);

      // Should show HSBC oro (the only other account, not the origin Santander)
      expect(screen.getByText('HSBC oro')).toBeInTheDocument();
      
      // Should not show Santander as it's the origin account - check that Santander only appears once (in origin dropdown)
      const santanderElements = screen.queryAllByText(/Santander/);
      expect(santanderElements).toHaveLength(1); // Only in the origin dropdown
    });

    it('should call updateDestination when a destination account is selected', async () => {
      const mockUpdateDestination = jest.fn();

      const user = userEvent.setup();
      render(<TransferAccountsSelectorWrapper />);

      const destinationButton = screen.getByTestId('select-destination-dropdown-button');
      await user.click(destinationButton);

      const hsbc = screen.getByText('HSBC Debit');
      await user.click(hsbc);

      expect(mockUpdateDestination).toHaveBeenCalledWith(mockAccountTransfer2);
    });
  });

  describe('Error Handling', () => {
    it('should display error message when destinationError exists', () => {
      const errorMessage = 'Cannot transfer to the same account';

      render(<TransferAccountsSelectorWrapper />);

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should not display error message when destinationError is null', () => {
      render(<TransferAccountsSelectorWrapper />);

      expect(screen.queryByText(/cannot transfer/i)).not.toBeInTheDocument();
    });

    it('should display error with proper styling', () => {
      const errorMessage = 'Transfer error occurred';

      render(<TransferAccountsSelectorWrapper />);

      const errorElement = screen.getByText(errorMessage);
      expect(errorElement).toBeInTheDocument();
      // The ErrorMessage component should have proper styling
      expect(errorElement.closest('div')).toHaveClass('text-red-600');
    });
  });

  describe('Component Integration', () => {
    it('should render both dropdowns and handle state updates correctly', async () => {
      const mockUpdateOrigin = jest.fn();
      const mockUpdateDestination = jest.fn();

      const user = userEvent.setup();
      render(<TransferAccountsSelectorWrapper />);

      // Verify initial state
      expect(screen.getByText('Origen: Santander Credit')).toBeInTheDocument();
      expect(screen.getByText('Destino:')).toBeInTheDocument();

      // Test origin selection
      const originButton = screen.getByTestId('select-origin-dropdown-button');
      await user.click(originButton);
      await user.click(screen.getByText('HSBC Debit'));
      expect(mockUpdateOrigin).toHaveBeenCalledWith(mockAccountTransfer2);

      // Test destination selection
      const destinationButton = screen.getByTestId('select-destination-dropdown-button');
      await user.click(destinationButton);
      await user.click(screen.getByText('BBVA Savings'));
      expect(mockUpdateDestination).toHaveBeenCalledWith(mockAccountTransfer3);
    });

    it('should handle empty accounts list gracefully', () => {

      render(<TransferAccountsSelectorInner />);

      expect(screen.getByText('Origen:')).toBeInTheDocument();
      expect(screen.getByText('Destino:')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper testids for automation', () => {
      render(<TransferAccountsSelectorInner />);

      expect(screen.getByTestId('select-origin-dropdown-button')).toBeInTheDocument();
      expect(screen.getByTestId('select-destination-dropdown-button')).toBeInTheDocument();
    });

    it('should have proper button roles', () => {
      render(<TransferAccountsSelectorInner />);

      const originButton = screen.getByTestId('select-origin-dropdown-button');
      const destinationButton = screen.getByTestId('select-destination-dropdown-button');

      expect(originButton).toHaveAttribute('type', 'button');
      expect(destinationButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Edge Cases', () => {
    it('should handle single account scenario', () => {
      const singleAccount = [mockAccountTransfer1];
      mockUseTransferBankAccounts.mockReturnValue({
        ...defaultMockHookReturn,
        accountsFormatted: singleAccount,
        destinationAccounts: [], // No destinations available
        origin: mockAccountTransfer1
      });

      render(<TransferAccountsSelectorInner />);

      expect(screen.getByText('Origen: Santander Credit')).toBeInTheDocument();
      expect(screen.getByText('Destino:')).toBeInTheDocument();
    });

    it('should handle very long account names gracefully', () => {
      const longNameAccount: AccountTransfer = {
        accountId: '999',
        name: 'Very Long Account Name That Might Cause Display Issues',
        type: 'Crédito'
      };

      mockUseTransferBankAccounts.mockReturnValue({
        ...defaultMockHookReturn,
        origin: longNameAccount
      });

      render(<TransferAccountsSelectorInner />);

      expect(screen.getByText('Origen: Very Long Account Name That Might Cause Display Issues')).toBeInTheDocument();
    });

    it('should handle special characters in account names', () => {
      const specialCharAccount: AccountTransfer = {
        accountId: '999',
        name: 'Café & Más - España',
        type: 'Crédito'
      };

      mockUseTransferBankAccounts.mockReturnValue({
        ...defaultMockHookReturn,
        origin: specialCharAccount
      });

      render(<TransferAccountsSelectorInner />);

      expect(screen.getByText('Origen: Café & Más - España')).toBeInTheDocument();
    });
  });

  describe('Wrapper Component Tests', () => {
    it('should pass correct props to useTransferBankAccounts hook', () => {
      render(
        <TransferAccountsSelectorInner
          subscreen="transfer"
          accessToken="custom-token"
          selectedAccount="account-123"
        />
      );

      expect(mockUseTransferBankAccounts).toHaveBeenCalledWith({
        subscreen: 'transfer',
        accessToken: 'custom-token',
        selectedAccount: 'account-123'
      });
    });

    it('should use default props when not provided', () => {
      render(<TransferAccountsSelectorInner />);

      expect(mockUseTransferBankAccounts).toHaveBeenCalledWith({
        subscreen: 'transfer',
        accessToken: 'test-token',
        selectedAccount: null
      });
    });

    it('should handle different subscreen values', () => {
      render(
        <TransferAccountsSelectorInner
          subscreen="expense"
        />
      );

      expect(mockUseTransferBankAccounts).toHaveBeenCalledWith({
        subscreen: 'expense',
        accessToken: 'test-token',
        selectedAccount: null
      });
    });
  });
});
