import { render, screen } from "@testing-library/react"

import { IncomeExpensesChart } from "@/features/Charts/IncomeExpensesChart"
import { recordMock } from "../../mocks/records.mock"

describe('IncomeExpenseChart', () => {
  window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

  it('Show income expense chart', () => {
    render(<IncomeExpensesChart records={[recordMock]} />)

    expect(screen.getByText('Ingresos vs Gastos')).toBeInTheDocument()
    expect(screen.getByTestId('income-expenses-chart')).toBeInTheDocument()
  })
})