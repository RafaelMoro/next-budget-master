import { useState } from "react";
import { cleanCurrencyString, formatNumberToCurrency, shiftSingleDecimalLeft, shiftThousandSingleDecimalLeft } from "../utils/formatNumberCurrency.utils";

interface UseCurrencyFieldProps {
  amount: string | null;
  fieldName: string;
}

export const useCurrencyField = ({ amount }: UseCurrencyFieldProps) => {
  const DEFAULT_AMOUNT_VALUE = '$0.00'
  const [currencyState, setCurrencyState] = useState(amount ?? DEFAULT_AMOUNT_VALUE);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Matches values between $0.001 and $0.009 inclusive
    const currencyFirstNumber = /^\$0\.00[1-9]$/;
    const currencySecondNumber = /^\$0\.0[1-9][0-9]$/;
    const currencyThirdNumber = /^\$0\.[1-9][1-9][0-9]$/;
    const numberWithThousand = /^\$(\d{1,3}(,\d{3})+)\.[1-9]{3}$/
    const numberWithoutThousand = /^\$\d+\.\d{3}$/
    const deletedNumberRegex = /^\$\d+\.\d$/;
    const deletedNumberThousandRegex = /^\$(\d{1,3}(,\d{3})+)\.\d$/
    console.log('value', value)

    if (currencyFirstNumber.test(value)) {
      const newValue = `$0.0${value.charAt(5)}`
      setCurrencyState(newValue);
      return;
    }
    if (currencySecondNumber.test(value)) {
      const newValue = `$0.${value.charAt(4)}${value.charAt(5)}`
      setCurrencyState(newValue);
      return;
    }
    if (currencyThirdNumber.test(value)) {
      const newValue = `$${value.charAt(3)}.${value.charAt(4)}${value.charAt(5)}`
      setCurrencyState(newValue)
      return;
    }
    if (numberWithoutThousand.test(value)) {
      const valueCleaned = cleanCurrencyString(value);
      const valueTransformed = formatNumberToCurrency(valueCleaned);
      setCurrencyState(valueTransformed);
      return;
    }
    if (numberWithThousand.test(value)) {
      const valueCleaned = cleanCurrencyString(value);
      const valueTransformed = formatNumberToCurrency(valueCleaned);
      setCurrencyState(valueTransformed);
      return;
    }
    if (deletedNumberRegex.test(value)) {
      const valueCleaned = shiftSingleDecimalLeft(value)
      const valueTransformed = formatNumberToCurrency(valueCleaned);
      setCurrencyState(valueTransformed);
      return;
    }
    if (deletedNumberThousandRegex.test(value)) {
      const valueCleaned = shiftThousandSingleDecimalLeft(value)
      const valueTransformed = formatNumberToCurrency(valueCleaned);
      setCurrencyState(valueTransformed);
      return;
    }
    
  }

  

  return {
    handleChange,
    currencyState,
  };
}