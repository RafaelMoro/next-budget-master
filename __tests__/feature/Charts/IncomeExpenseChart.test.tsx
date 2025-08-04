import { render, screen } from "@testing-library/react"

import { IncomeExpensesChart } from "@/features/Charts/IncomeExpensesChart"
import { recordMock } from "../../mocks/records.mock"

describe('IncomeExpenseChart', () => {
  // Fix error: ResizeObserver is not defined
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

  it('Given no records, Show message of not enough data to show a chart', () => {
    render(<IncomeExpensesChart records={[]} />)

    expect(screen.getByText('Ingresos vs Gastos')).toBeInTheDocument()
    expect(screen.getByText('No hay datos suficientes para mostrar el gráfico.')).toBeInTheDocument()
  })
})