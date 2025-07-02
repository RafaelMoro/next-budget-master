"use client"

import React from "react"

import { DatePicker } from "@/shared/ui/tremor/DatePicker"
import { Button } from "flowbite-react"

export const DatePickerTimeExample = () => {
  const [value, setValue] = React.useState<Date | undefined>(undefined)

  return (
    <>
      <div className="mx-auto flex max-w-xs flex-col gap-2">
        <p className="text-gray-500">
          {value ? value.toString() : "Select a date"}
        </p>
        <DatePicker
          showTimePicker
          value={value}
          onChange={(value) => {
            setValue(value)
          }}
        />
        <div className="flex justify-end gap-2">
          <Button color="negative" onClick={() => setValue(undefined)}>
            Reset
          </Button>
          <Button color="secondary" onClick={() => setValue(new Date())}>
            Now
          </Button>
        </div>
      </div>
    </>
  )
}