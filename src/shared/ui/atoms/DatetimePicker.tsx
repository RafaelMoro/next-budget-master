"use client"

import { useState } from "react"
import { DatePicker } from "../tremor/DatePicker"

export const DateTimePicker = () => {
  const [value, setValue] = useState<Date | undefined>(new Date())

  return (
    <DatePicker
      showTimePicker
      value={value}
      onChange={(value) => {
        setValue(value)
      }}
    />
  )
}