import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SelectPaidSection } from '@/features/Records/ExpensesPaid/SelectPaidSection';
import { expensePaidFromRecordMock, expensePaidFromEditExpense } from '../../mocks/records.mock';
import { ExpensePaid } from '@/shared/types/records.types';
import { DEFAULT_AMOUNT_VALUE } from '@/shared/constants/Global.constants';

const SelectPaidSectionWrapper = ({
  selectedExpenses = [],
  toggleOpen = jest.fn(),
  totalSelectedExpenses = DEFAULT_AMOUNT_VALUE,
}: {
  selectedExpenses?: ExpensePaid[];
  toggleOpen?: () => void;
  totalSelectedExpenses?: string
}) => {
  return (
    <SelectPaidSection
      selectedExpenses={selectedExpenses}
      totalSelectedExpenses={totalSelectedExpenses}
      toggleOpen={toggleOpen}
    />
  );
};

describe('SelectPaidSection', () => {
  it('should render the section with default text when no expenses are selected', () => {
    render(<SelectPaidSectionWrapper />);

    expect(screen.getByText('Conecta este pago con tus gastos')).toBeInTheDocument();
    expect(screen.getByText('Puedes asociar este pago con una o varias transacciones para indicar qué estás pagando.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Agregar gastos/i })).toBeInTheDocument();
    expect(screen.queryByText(/Gastos seleccionados:/)).not.toBeInTheDocument();
  });

  it('should render the section with manage expenses text when expenses are selected', () => {
    const selectedExpenses = [expensePaidFromRecordMock, expensePaidFromEditExpense];
    render(<SelectPaidSectionWrapper selectedExpenses={selectedExpenses} totalSelectedExpenses="$42.54" />);

    expect(screen.getByText('Conecta este pago con tus gastos')).toBeInTheDocument();
    expect(screen.getByText('Puedes asociar este pago con una o varias transacciones para indicar qué estás pagando.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Administrar gastos/i })).toBeInTheDocument();
    expect(screen.getByText('Gastos seleccionados: 2')).toBeInTheDocument();
    expect(screen.getByText('Total: $42.54')).toBeInTheDocument();
  });

  it('should call toggleOpen when button is clicked', async () => {
    const user = userEvent.setup();
    const toggleOpen = jest.fn();
    render(<SelectPaidSectionWrapper toggleOpen={toggleOpen} />);

    const button = screen.getByRole('button', { name: /Agregar gastos/i });
    await user.click(button);

    expect(toggleOpen).toHaveBeenCalledTimes(1);
  });

  it('should display correct number of selected expenses', () => {
    const selectedExpenses = [expensePaidFromRecordMock];
    render(<SelectPaidSectionWrapper selectedExpenses={selectedExpenses} />);

    expect(screen.getByText('Gastos seleccionados: 1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Administrar gastos/i })).toBeInTheDocument();
  });
});
