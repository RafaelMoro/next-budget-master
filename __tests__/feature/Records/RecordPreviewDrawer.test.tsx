import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecordsPreviewDrawer } from '@/features/Records/RecordsPreviewDrawer';
import { useRecordPreview } from '@/shared/hooks/useRecordPreview';
import { recordMock, paidRecordMock } from '../../mocks/records.mock';
import { BankMovement } from '@/shared/types/records.types';
import { AppRouterContextProviderMock } from '@/shared/ui/organisms/AppRouterContextProviderMock';
import { DashboardStoreProvider } from '@/zustand/provider/dashboard-store-provider';
import { mockAccounts } from '../../mocks/accounts.mock';

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

const RecordsPreviewDrawerWrapper = ({ push, recordProp = recordMock  }: { push: () => void; recordProp?: BankMovement }) => {
  const {
    openRecordDrawer,
    record,
    handleOpenRecordPreviewDrawer,
    handleCloseRecordPreviewDrawer,
  } = useRecordPreview();

  return (
    <DashboardStoreProvider accounts={mockAccounts} records={[]} selectedAccountId={mockAccounts[0]._id}>
      <div>
        <button onClick={() => handleOpenRecordPreviewDrawer(recordProp)}>Open Drawer</button>
        <AppRouterContextProviderMock router={{ push }}>
          <RecordsPreviewDrawer
            open={openRecordDrawer}
            handleClose={handleCloseRecordPreviewDrawer}
            record={record}
          />
        </AppRouterContextProviderMock>
      </div>
    </DashboardStoreProvider>
  );
};

describe('RecordsPreviewDrawer', () => {
  it('should render the drawer with record details when open', async () => {
    const user = userEvent.setup();
    const push = jest.fn();
    render(<RecordsPreviewDrawerWrapper push={push} />);

    const openButton = screen.getByText('Open Drawer');
    await user.click(openButton);

    expect(screen.getByText('Detalles de la transacción')).toBeInTheDocument();
    expect(screen.getByText('Gasto')).toBeInTheDocument();
    expect(screen.getByText(recordMock.shortName)).toBeInTheDocument();
    expect(screen.getByText(recordMock.amountFormatted)).toBeInTheDocument();

    if (recordMock.category) {
      expect(screen.getByText(recordMock.category.categoryName)).toBeInTheDocument();
    }

    expect(screen.getByText(recordMock.subCategory)).toBeInTheDocument();
    expect(screen.getByText('Estatus de pago:')).toBeInTheDocument();
    expect(screen.getByText('Sin pagar')).toBeInTheDocument();
  });

  it('should close the drawer when the close button is clicked', async () => {
    const user = userEvent.setup();
    const push = jest.fn();
    render(<RecordsPreviewDrawerWrapper push={push} />);

    const openButton = screen.getByText('Open Drawer');
    await user.click(openButton);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(screen.queryByText('Detalles de la transacción')).not.toBeInTheDocument();
  });

  it('should display the correct paid status when the record is paid', async () => {
    const user = userEvent.setup();
    const push = jest.fn();
    render(<RecordsPreviewDrawerWrapper recordProp={paidRecordMock}  push={push} />);

    const openButton = screen.getByText('Open Drawer');
    await user.click(openButton);

    expect(screen.getByText('Pagado')).toBeInTheDocument();
  });
});