import { useState, useRef } from "react";
import { formatCurrencyToString } from "../utils/formatNumberCurrency.utils";

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
    console.log('value', value)

    if (currencyFirstNumber.test(value)) {
      const newValue = `$0.0${value.charAt(5)}`
      setCurrencyState(newValue);
      return;
    }
    if (currencySecondNumber.test(value)) {
      const newValue = `$0.${value.charAt(4)}${value.charAt(6)}`
      setCurrencyState(newValue);
      return;
    }
    const startsWithDollarSign = value.startsWith('$');
    
    setCurrencyState(value)
  }

  

  return {
    handleChange,
    currencyState,
  };
}