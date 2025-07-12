import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useHandleBudgets } from '@/shared/hooks/useHandleBudgets';
import { SelectBudgetDropdown } from '@/features/Budgets/SelectBudget';
import { mockBudgets } from '../mocks/budgets.mock';

const SelectBudgetDropdownWrapper = () => {
  const { budgetsOptions, selectedBudget, updateSelectedBudget } = useHandleBudgets({ budgetsFetched: mockBudgets });

  return (
    <SelectBudgetDropdown
      budgetOptions={budgetsOptions}
      selectedBudget={selectedBudget}
      updateSelectedBudget={updateSelectedBudget}
    />
  );
};

describe('SelectBudgetDropdown', () => {
  it('should render the dropdown with budget options', async () => {
    const user = userEvent.setup();
    render(<SelectBudgetDropdownWrapper />);

    // Verify the dropdown button is rendered
    const dropdownButton = screen.getByTestId('select-budget-dropdown-button');
    expect(dropdownButton).toBeInTheDocument();
    expect(dropdownButton).toHaveTextContent('Presupuesto:');

    // Open the dropdown
    await user.click(dropdownButton);

    // Verify the budget options are rendered
    const budgetOption1 = screen.getByText('Monthly Budget');
    const budgetOption2 = screen.getByText('Yearly Savings');
    expect(budgetOption1).toBeInTheDocument();
    expect(budgetOption2).toBeInTheDocument();
  });

  it('should update the selected budget when an option is clicked', async () => {
    const user = userEvent.setup();
    render(<SelectBudgetDropdownWrapper />);

    // Open the dropdown
    const dropdownButton = screen.getByTestId('select-budget-dropdown-button');
    await user.click(dropdownButton);

    // Click on a budget option
    const budgetOption = screen.getByText('Monthly Budget');
    await user.click(budgetOption);

    // Verify the selected budget is updated
    expect(dropdownButton).toHaveTextContent('Presupuesto: Monthly Budget');
  });
});