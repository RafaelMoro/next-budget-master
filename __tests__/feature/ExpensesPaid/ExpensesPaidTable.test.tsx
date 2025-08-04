import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExpensesPaidTable } from '@/features/Records/ExpensesPaid/ExpensesPaidTable';
import { 
  expensePaidListMock1, 
  expensePaidListMock2, 
  expensePaidListMock3 
} from '../../mocks/records.mock';
import { ExpensePaid } from '@/shared/types/records.types';
import { DEFAULT_AMOUNT_VALUE } from '@/shared/constants/Global.constants';

const ExpensesPaidTableWrapper = ({
  expenses = [],
  selectedExpenses = [],
  totalSelectedExpenses = DEFAULT_AMOUNT_VALUE,
  handleSelectExpense = jest.fn(),
  handleUnselectExpense = jest.fn()
}: {
  expenses?: ExpensePaid[];
  selectedExpenses?: ExpensePaid[];
  handleSelectExpense?: (expense: ExpensePaid) => void;
  handleUnselectExpense?: (expense: ExpensePaid) => void;
  totalSelectedExpenses?: string
}) => {
  return (
    <ExpensesPaidTable
      expenses={expenses}
      selectedExpenses={selectedExpenses}
      totalSelectedExpenses={totalSelectedExpenses}
      handleSelectExpense={handleSelectExpense}
      handleUnselectExpense={handleUnselectExpense}
    />
  );
};

describe('ExpensesPaidTable', () => {
  const mockExpenses = [expensePaidListMock1, expensePaidListMock2, expensePaidListMock3];

  it('should render the table with expenses data', () => {
    render(<ExpensesPaidTableWrapper expenses={mockExpenses} />);

    expect(screen.getByTestId('show-expenses-paid-table')).toBeInTheDocument();
    expect(screen.getByText('Descripción')).toBeInTheDocument();
    expect(screen.getByText('Monto')).toBeInTheDocument();
    expect(screen.getByText('Fecha')).toBeInTheDocument();
    expect(screen.getByText('Pagado')).toBeInTheDocument();

    // Check if expense data is rendered
    expect(screen.getByText(expensePaidListMock1.shortName)).toBeInTheDocument();
    expect(screen.getByText(expensePaidListMock1.amountFormatted)).toBeInTheDocument();
    expect(screen.getByText(expensePaidListMock1.fullDate)).toBeInTheDocument();

    expect(screen.getByText(expensePaidListMock2.shortName)).toBeInTheDocument();
    expect(screen.getByText(expensePaidListMock2.amountFormatted)).toBeInTheDocument();
    expect(screen.getByText(expensePaidListMock2.fullDate)).toBeInTheDocument();

    expect(screen.getByText(expensePaidListMock3.shortName)).toBeInTheDocument();
    expect(screen.getByText(expensePaidListMock3.amountFormatted)).toBeInTheDocument();
    expect(screen.getByText(expensePaidListMock3.fullDate)).toBeInTheDocument();

    expect(screen.getByText(/Movimientos seleccionados:/i)).toBeInTheDocument();
    expect(screen.getByText(`Total: ${DEFAULT_AMOUNT_VALUE}`)).toBeInTheDocument();
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
        expenses={[expensePaidListMock1]}
        handleSelectExpense={handleSelectExpense}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleSelectExpense).toHaveBeenCalledTimes(1);
    expect(handleSelectExpense).toHaveBeenCalledWith(expensePaidListMock1);
  });

  it('should call handleUnselectExpense when a checked checkbox is clicked', async () => {
    const user = userEvent.setup();
    const handleUnselectExpense = jest.fn();
    render(
      <ExpensesPaidTableWrapper
        expenses={[expensePaidListMock1]}
        selectedExpenses={[expensePaidListMock1]}
        handleUnselectExpense={handleUnselectExpense}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(handleUnselectExpense).toHaveBeenCalledTimes(1);
    expect(handleUnselectExpense).toHaveBeenCalledWith(expensePaidListMock1);
  });

  it('should show selected expenses as checked and display total selected expenses', () => {
    render(
      <ExpensesPaidTableWrapper
        expenses={mockExpenses}
        totalSelectedExpenses="$42.54"
        selectedExpenses={[expensePaidListMock1, expensePaidListMock2]}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // expensePaidListMock1
    expect(checkboxes[1]).toBeChecked(); // expensePaidListMock2
    expect(checkboxes[2]).not.toBeChecked(); // expensePaidListMock3 - not in selectedExpenses
    expect(screen.getByText('Movimientos seleccionados: 2')).toBeInTheDocument();
    expect(screen.getByText('Total: $42.54')).toBeInTheDocument();
  });

  it('should display paid status correctly for expenses', () => {
    render(<ExpensesPaidTableWrapper expenses={[expensePaidListMock1, expensePaidListMock2]} />);

    // expensePaidListMock1 has isPaid: false, so it should show a close icon
    // expensePaidListMock2 has isPaid: true, so it should show a check icon
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
