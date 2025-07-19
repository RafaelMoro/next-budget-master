"use client"
import { useState } from "react"
import { AnimatePresence } from "motion/react"

import { useCurrencyField } from "@/shared/hooks/useCurrencyField"
import { CurrencyField } from "@/shared/ui/atoms/CurrencyField"
import { DateTimePicker } from "@/shared/ui/atoms/DatetimePicker"
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage"

export const TransferTemplate = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { handleChange, currencyState, errorAmount, validateZeroAmount, handleEditState: handleEditCurrency,
  } = useCurrencyField({
    amount: null,
  })

  return (
    <div className="w-full flex justify-center gap-32">
      <AnimatePresence>
        <form
          key="transfer-template-form"
          // onSubmit={handleSubmit(onSubmit)}
          className="w-full px-4 mx-auto flex flex-col gap-4 md:max-w-xl mb-6 lg:mx-0 lg:px-0"
        >
          <DateTimePicker date={date} setDate={setDate} />
          <CurrencyField
            labelName="Cantidad"
            dataTestId="amount"
            fieldId="amount"
            value={currencyState}
            handleChange={handleChange}
          />
          { errorAmount && (
            <ErrorMessage isAnimated>{errorAmount}</ErrorMessage>
          )}
        </form>
      </AnimatePresence>
    </div>
  )
}