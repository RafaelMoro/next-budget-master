import { render, screen } from "@testing-library/react"
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
})