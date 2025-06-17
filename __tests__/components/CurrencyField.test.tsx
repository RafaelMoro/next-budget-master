import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';

import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { cleanCurrencyString, shiftSingleDecimalLeft } from '@/shared/utils/formatNumberCurrency.utils';

const CurrencyFieldWrapper = ({ amount = null }: { amount?: string | null }) => {
  const { currencyState, handleChange } = useCurrencyField({
    amount,
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

  it('Given the case where we pass an amount $123.45, expect to see the input to have the value $123.45', () => {
    render(<CurrencyFieldWrapper amount="$123.45" />)

    expect(screen.getByTestId('amount')).toBeInTheDocument()
    expect(screen.getByTestId('amount')).toHaveValue('$123.45')
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

    it('Given a user typing 123070, expect the input to have value $1,230.70', async () => {
      const user = userEvent.setup();
      render(<CurrencyFieldWrapper />)
  
      const input = screen.getByTestId('amount')
      await user.type(input, '123070')

      expect(input).toHaveValue('$1,230.70')
    })

    it(`Given a user typing 1234477, then expect the input to have value $12,344.77,
      then the user delete one number and the input should have the value $1,234.47`, async () => {
      const user = userEvent.setup();
      render(<CurrencyFieldWrapper />)
  
      const input = screen.getByTestId('amount')
      await user.type(input, '1234477')

      expect(input).toHaveValue('$12,344.77')
      await user.type(input, '{backspace}')
      expect(input).toHaveValue('$1,234.47')
    })

    it(`Given a user typing 123447, then expect the input to have value $1,234.47,
      then the user delete one number and the input should have the value $123.44`, async () => {
      const user = userEvent.setup();
      render(<CurrencyFieldWrapper />)
  
      const input = screen.getByTestId('amount')
      await user.type(input, '123447')

      expect(input).toHaveValue('$1,234.47')
      await user.type(input, '{backspace}')
      expect(input).toHaveValue('$123.44')
    })

    it(`Given a user typing 12234, then expect the input to have value $122.34,
      then the user deletes all the numbers, expect the input to have value $0.00`, async () => {
      const user = userEvent.setup();
      render(<CurrencyFieldWrapper />)
  
      const input = screen.getByTestId('amount')
      await user.type(input, '12234')

      expect(input).toHaveValue('$122.34')
      await user.type(input, '{backspace}{backspace}{backspace}{backspace}{backspace}')
      expect(input).toHaveValue('$0.00')
    })

    it('Given a user typing a character, special character, then expect the input to have $0.00', async () => {
      const user = userEvent.setup();
      render(<CurrencyFieldWrapper />)
  
      const input = screen.getByTestId('amount')
      await user.type(input, 'a@/>#$%^&*()')

      expect(input).toHaveValue('$0.00')
    })
  })

  describe('Currency utilities', () => {
    it('should shift the decimal for three decimals in cleanCurrencyString', () => {
      expect(cleanCurrencyString('$1.234')).toBe(12.34);
      expect(cleanCurrencyString('$12,345.678')).toBe(123456.78);
    });
    it('should return the parsed float for normal currency strings', () => {
      expect(cleanCurrencyString('$123.45')).toBe(123.45);
      expect(cleanCurrencyString('$1,234.00')).toBe(1234.00);
    });
    it('should shift the decimal left for a single decimal in shiftSingleDecimalLeft', () => {
      expect(shiftSingleDecimalLeft('$12.3')).toBe(1.23);
      expect(shiftSingleDecimalLeft('$123.4')).toBe(12.34);
      expect(shiftSingleDecimalLeft('$1,234.5')).toBe(123.45);
    });
  })
})