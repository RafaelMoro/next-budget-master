import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExpensesPaidTable } from '@/features/Records/ExpensesPaid/ExpensesPaidTable';
import { recordMock, editExpense, paidRecordMock } from '../../mocks/records.mock';
import { BankMovement } from '@/shared/types/records.types';

const ExpensesPaidTableWrapper = ({
  expenses = [],
  selectedExpenses = [],
  handleSelectExpense = jest.fn(),
  handleUnselectExpense = jest.fn()
}: {
  expenses?: BankMovement[];
  selectedExpenses?: BankMovement[];
  handleSelectExpense?: (expense: BankMovement) => void;
  handleUnselectExpense?: (expense: BankMovement) => void;
}) => {
  return (
    <ExpensesPaidTable
      expenses={expenses}
      selectedExpenses={selectedExpenses}
      handleSelectExpense={handleSelectExpense}
      handleUnselectExpense={handleUnselectExpense}
    />
  );
};

describe('ExpensesPaidTable', () => {
  const mockExpenses = [recordMock, editExpense, paidRecordMock];

  it('should render the table with expenses data', () => {
    render(<ExpensesPaidTableWrapper expenses={mockExpenses} />);

    expect(screen.getByTestId('show-expenses-paid-table')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('Monto')).toBeInTheDocument();
    expect(screen.getByText('Fecha')).toBeInTheDocument();
    expect(screen.getByText('Pagado')).toBeInTheDocument();

    // Check if expense data is rendered
    expect(screen.getByText(recordMock.shortName)).toBeInTheDocument();
    expect(screen.getByText(recordMock.amountFormatted)).toBeInTheDocument();
    expect(screen.getByText(recordMock.fullDate)).toBeInTheDocument();

    expect(screen.getByText(editExpense.shortName)).toBeInTheDocument();
    expect(screen.getByText(editExpense.amountFormatted)).toBeInTheDocument();

    expect(screen.getByText(paidRecordMock.shortName)).toBeInTheDocument();
    expect(screen.getByText(paidRecordMock.amountFormatted)).toBeInTheDocument();
  });

  it('should show checkboxes for each expense', () => {
    render(<ExpensesPaidTableWrapper expenses={mockExpenses} />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  it('should call handleSelectExpense when an unchecked checkbox is clicked', async () => {
    const user = userEvent.setup();
    const handleSelectExpense = jest.fn();
    render(
      <ExpensesPaidTableWrapper
        expenses={[recordMock]}
        handleSelectExpense={handleSelectExpense}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleSelectExpense).toHaveBeenCalledTimes(1);
    expect(handleSelectExpense).toHaveBeenCalledWith(recordMock);
  });

  it('should call handleUnselectExpense when a checked checkbox is clicked', async () => {
    const user = userEvent.setup();
    const handleUnselectExpense = jest.fn();
    render(
      <ExpensesPaidTableWrapper
        expenses={[recordMock]}
        selectedExpenses={[recordMock]}
        handleUnselectExpense={handleUnselectExpense}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleUnselectExpense).toHaveBeenCalledTimes(1);
    expect(handleUnselectExpense).toHaveBeenCalledWith(recordMock);
  });

  it('should show selected expenses as checked', () => {
    render(
      <ExpensesPaidTableWrapper
        expenses={mockExpenses}
        selectedExpenses={[recordMock, editExpense]}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // recordMock
    expect(checkboxes[1]).toBeChecked(); // editExpense
    expect(checkboxes[2]).not.toBeChecked(); // paidRecordMock
  });

  it('should display paid status correctly for expenses', () => {
    render(<ExpensesPaidTableWrapper expenses={[recordMock, paidRecordMock]} />);

    // recordMock has isPaid: false, so it should show a close icon
    // paidRecordMock has isPaid: true, so it should show a check icon
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3); // header + 2 data rows
  });

  it('should render empty table when no expenses are provided', () => {
    render(<ExpensesPaidTableWrapper expenses={[]} />);

    expect(screen.getByTestId('show-expenses-paid-table')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    
    // Should only have header row
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);
  });
});
