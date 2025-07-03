"use client"
import { DatePicker } from "../tremor/DatePicker"

interface DateTimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export const DateTimePicker = ({ date, setDate }: DateTimePickerProps) => {
  return (
    <DatePicker
      showTimePicker
      value={date}
      onChange={(value) => {
        setDate(value)
      }}
    />
  )
}