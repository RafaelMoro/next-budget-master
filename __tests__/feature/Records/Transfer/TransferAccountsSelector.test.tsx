import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import { TransferAccountsSelector } from '@/features/Records/Transfer/TransferAccountsSelector';
import { useTransferBankAccounts } from '@/shared/hooks/useTransferBankAccounts';
import { QueryProviderWrapper } from '@/app/QueryProviderWrapper';
import { TransactionScreens } from '@/shared/types/dashboard.types';
import { mockAccounts } from '../../../mocks/accounts.mock';

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
      mockedAxios.get.mockResolvedValue({
        data: {
          data: {
            accounts: mockAccounts
          }
        }
      })

      const user = userEvent.setup();
      render(<TransferAccountsSelectorWrapper />);

      // Wait for accounts to load
      await screen.findByText('Origen: Santander');

      const destinationButton = screen.getByTestId('select-destination-dropdown-button');
      await user.click(destinationButton);

      // Click on HSBC oro (the correct account name from mock data)
      const hsbc = screen.getByText('HSBC oro');
      await user.click(hsbc);

      // Since we're using the real hook, verify the behavior by checking 
      // that the destination has changed in the UI
      expect(await screen.findByText('Destino: HSBC oro')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should render both dropdowns and handle state updates correctly', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          data: {
            accounts: mockAccounts
          }
        }
      })

      const user = userEvent.setup();
      render(<TransferAccountsSelectorWrapper />);

      // Wait for accounts to load and verify initial state
      await screen.findByText('Origen: Santander');
      expect(screen.getByText('Destino:')).toBeInTheDocument();

      // Test origin selection - change from Santander to HSBC oro
      const originButton = screen.getByTestId('select-origin-dropdown-button');
      await user.click(originButton);
      
      // Wait for dropdown to open and click HSBC oro
      await user.click(screen.getByText('HSBC oro'));
      
      // Verify origin has changed
      expect(await screen.findByText('Origen: HSBC oro')).toBeInTheDocument();

      // Test destination selection - with HSBC oro as origin, Santander should be available as destination
      const destinationButton = screen.getByTestId('select-destination-dropdown-button');
      await user.click(destinationButton);
      
      // Wait for dropdown to open and click Santander (now available as destination)
      await user.click(screen.getByText('Santander'));
      
      // Verify destination has changed
      expect(await screen.findByText('Destino: Santander')).toBeInTheDocument();
    });
  });
});
