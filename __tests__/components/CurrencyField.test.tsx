import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';

import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"

const CurrencyFieldWrapper = () => {
  const { currencyState, handleChange } = useCurrencyField({
    amount: null,
  })

  return (
    <CurrencyField
      labelName="Saldo de la cuenta"
      dataTestId="amount"
      fieldId="amount"
      value={currencyState}
      handleChange={handleChange}
    />
  )
}

describe('CurrencyField', () => {
  it('Render the component', () => {
    render(<CurrencyFieldWrapper />)

    expect(screen.getByTestId('amount')).toBeInTheDocument()
  })
  describe('Currency field validations', () => {
    it('Given a user typing 1, expect the input to have value $0.01', async () => {
      const user = userEvent.setup();
      render(<CurrencyFieldWrapper />)
  
      const input = screen.getByTestId('amount')
      await user.type(input, '1')

      expect(input).toHaveValue('$0.01')
    })

    it('Given a user typing 12, expect the input to have value $0.12', async () => {
      const user = userEvent.setup();
      render(<CurrencyFieldWrapper />)
  
      const input = screen.getByTestId('amount')
      await user.type(input, '12')

      expect(input).toHaveValue('$0.12')
    })

    it('Given a user typing 123, expect the input to have value $1.23', async () => {
      const user = userEvent.setup();
      render(<CurrencyFieldWrapper />)
  
      const input = screen.getByTestId('amount')
      await user.type(input, '123')

      expect(input).toHaveValue('$1.23')
    })

    it('Given a user typing 12389, expect the input to have value $123.89', async () => {
      const user = userEvent.setup();
      render(<CurrencyFieldWrapper />)
  
      const input = screen.getByTestId('amount')
      await user.type(input, '12389')

      expect(input).toHaveValue('$123.89')
    })
  })
})