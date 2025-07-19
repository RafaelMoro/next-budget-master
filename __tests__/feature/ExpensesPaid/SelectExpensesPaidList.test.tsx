import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExpensesPaidList } from '@/features/Records/ExpensesPaid/SelectExpensesPaidList';
import { recordMock, editExpense, paidRecordMock } from '../../mocks/records.mock';
import { BankMovement } from '@/shared/types/records.types';

const ExpensesPaidListWrapper = ({
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
    <ExpensesPaidList
      expenses={expenses}
      selectedExpenses={selectedExpenses}
      handleSelectExpense={handleSelectExpense}
      handleUnselectExpense={handleUnselectExpense}
    />
  );
};

describe('ExpensesPaidList', () => {
  const mockExpenses = [recordMock, editExpense, paidRecordMock];

  it('should render the list with expenses data', () => {
    render(<ExpensesPaidListWrapper expenses={mockExpenses} />);

    // Check if expense data is rendered
    expect(screen.getByText(recordMock.shortName)).toBeInTheDocument();
    expect(screen.getByText(`- ${recordMock.amountFormatted}`)).toBeInTheDocument();
    expect(screen.getByText(recordMock.fullDate)).toBeInTheDocument();

    expect(screen.getByText(editExpense.shortName)).toBeInTheDocument();
    expect(screen.getByText(`- ${editExpense.amountFormatted}`)).toBeInTheDocument();
    expect(screen.getByText(editExpense.fullDate)).toBeInTheDocument();

    expect(screen.getByText(paidRecordMock.shortName)).toBeInTheDocument();
    expect(screen.getByText(`- ${paidRecordMock.amountFormatted}`)).toBeInTheDocument();
    expect(screen.getByText(paidRecordMock.fullDate)).toBeInTheDocument();
  });

  it('should show checkboxes for each expense', () => {
    render(<ExpensesPaidListWrapper expenses={mockExpenses} />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  it('should display paid status badges correctly', () => {
    render(<ExpensesPaidListWrapper expenses={[recordMock, paidRecordMock]} />);

    // Check for paid and unpaid badges
    const paidBadges = screen.getAllByText('Pagado');
    const unpaidBadges = screen.getAllByText('Sin pagar');
    
    expect(paidBadges).toHaveLength(1); // paidRecordMock
    expect(unpaidBadges).toHaveLength(1); // recordMock
  });

  it('should call handleSelectExpense when an unchecked checkbox is clicked', async () => {
    const user = userEvent.setup();
    const handleSelectExpense = jest.fn();
    render(
      <ExpensesPaidListWrapper
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
      <ExpensesPaidListWrapper
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
      <ExpensesPaidListWrapper
        expenses={mockExpenses}
        selectedExpenses={[recordMock, editExpense]}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked(); // recordMock
    expect(checkboxes[1]).toBeChecked(); // editExpense
    expect(checkboxes[2]).not.toBeChecked(); // paidRecordMock - not in selectedExpenses
  });

  it('should render amount with negative sign prefix', () => {
    render(<ExpensesPaidListWrapper expenses={[recordMock]} />);

    expect(screen.getByText(`- ${recordMock.amountFormatted}`)).toBeInTheDocument();
  });

  it('should render empty list when no expenses are provided', () => {
    render(<ExpensesPaidListWrapper expenses={[]} />);

    // Should not have any list items
    const checkboxes = screen.queryAllByRole('checkbox');
    expect(checkboxes).toHaveLength(0);
  });

  it('should display expenses in a scrollable container', () => {
    render(<ExpensesPaidListWrapper expenses={mockExpenses} />);

    const scrollableContainer = screen.getByRole('list').parentElement;
    expect(scrollableContainer).toHaveClass('max-h-[650px]', 'overflow-y-scroll');
  });

  it('should render date information for each expense', () => {
    render(<ExpensesPaidListWrapper expenses={[recordMock, editExpense]} />);

    expect(screen.getByText(recordMock.fullDate)).toBeInTheDocument();
    expect(screen.getByText(editExpense.fullDate)).toBeInTheDocument();
  });
});
