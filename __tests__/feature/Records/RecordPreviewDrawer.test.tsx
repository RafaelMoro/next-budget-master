import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecordsPreviewDrawer } from '@/features/Records/RecordsPreviewDrawer';
import { useRecordPreview } from '@/shared/hooks/useRecordPreview';
import { recordMock, paidRecordMock } from '../../mocks/records.mock';
import { BankMovement } from '@/shared/types/records.types';

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

const RecordsPreviewDrawerWrapper = ({ recordProp = recordMock  }: { recordProp?: BankMovement }) => {
  const {
    openRecordDrawer,
    record,
    handleOpenRecordPreviewDrawer,
    handleCloseRecordPreviewDrawer,
  } = useRecordPreview();

  return (
    <div>
      <button onClick={() => handleOpenRecordPreviewDrawer(recordProp)}>Open Drawer</button>
      <RecordsPreviewDrawer
        open={openRecordDrawer}
        handleClose={handleCloseRecordPreviewDrawer}
        record={record}
      />
    </div>
  );
};

describe('RecordsPreviewDrawer', () => {
  it('should render the drawer with record details when open', async () => {
    const user = userEvent.setup();
    render(<RecordsPreviewDrawerWrapper />);

    const openButton = screen.getByText('Open Drawer');
    await user.click(openButton);

    expect(screen.getByText('Detalles de la transacción')).toBeInTheDocument();
    expect(screen.getByText(recordMock.shortName)).toBeInTheDocument();
    expect(screen.getByText(recordMock.amountFormatted)).toBeInTheDocument();

    if (recordMock.category) {
      expect(screen.getByText(recordMock.category.categoryName)).toBeInTheDocument();
    }

    expect(screen.getByText(recordMock.subCategory)).toBeInTheDocument();
  });

  it('should close the drawer when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<RecordsPreviewDrawerWrapper />);

    const openButton = screen.getByText('Open Drawer');
    await user.click(openButton);

    const closeButton = screen.getByRole('button', { name: /close/i });
    await user.click(closeButton);

    expect(screen.queryByText('Detalles de la transacción')).not.toBeInTheDocument();
  });

  it('should display the correct paid status when the record is paid', async () => {
    const user = userEvent.setup();
    render(<RecordsPreviewDrawerWrapper recordProp={paidRecordMock} />);

    const openButton = screen.getByText('Open Drawer');
    await user.click(openButton);

    expect(screen.getByText('Pagado')).toBeInTheDocument();
  });
});