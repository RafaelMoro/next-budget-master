"use client"
import { FormEvent, useState } from "react"
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react"

import { EmptyAccordionResult } from "./EmptyAccordionResult"
import { useRecordPreview } from "@/shared/hooks/useRecordPreview"
import { RecordsPreviewDrawer } from "../RecordsPreviewDrawer"
import { DateRangeSearchPanel } from "@/shared/ui/molecules/DateRangeSearchPanel"
import { useSelectMonth } from "@/shared/hooks/useSelectMonth"
import { useSelectYear } from "@/shared/hooks/useSelectYear"

export const OlderRecordsAccordion = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleAccordionTitleClick = () => {
    setIsOpen(true)
  }

  const { selectedMonth, updateSelectMonth, allMonths } = useSelectMonth()
  const { selectedYear, updateSelectYear } = useSelectYear()
  const handleSubmitGetRecord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    // fetch records
  }

  const {
    record, handleOpenRecordPreviewDrawer, handleCloseRecordPreviewDrawer, openRecordDrawer
  } = useRecordPreview()

  return (
    <>
      <Accordion onClick={handleAccordionTitleClick} collapseAll className="max-w-3xl min-w-[540px]">
        <AccordionPanel>
          <AccordionTitle>Transacciones anteriores</AccordionTitle>
          <AccordionContent>
            <DateRangeSearchPanel
              allMonths={allMonths}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              handleSubmit={handleSubmitGetRecord}
              changeSelectedMonth={updateSelectMonth}
              changeSelectedYear={updateSelectYear}
            />
            <EmptyAccordionResult />
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
      <RecordsPreviewDrawer open={openRecordDrawer} handleClose={handleCloseRecordPreviewDrawer} record={record} />
    </>
  )
}