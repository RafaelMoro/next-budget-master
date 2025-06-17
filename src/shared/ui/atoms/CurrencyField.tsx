"use client"
import { Label, TextInput } from "flowbite-react"

interface CurrencyFieldProps {
  labelName: string;
  fieldId: string;
  dataTestId: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CurrencyField = ({
  labelName,
  fieldId,
  dataTestId,
  value,
  handleChange
}: CurrencyFieldProps) => {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={fieldId}>{labelName}</Label>
      </div>
      <TextInput
        data-testid={dataTestId}
        id={fieldId}
        value={value}
        type="text"
        inputMode="numeric"
        onChange={handleChange}
        />
    </div>
  )
}