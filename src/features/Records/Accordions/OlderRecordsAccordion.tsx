"use client"
import { useState } from "react"
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react"

import { EmptyAccordionResult } from "./EmptyAccordionResult"
import { useRecordPreview } from "@/shared/hooks/useRecordPreview"
import { RecordsPreviewDrawer } from "../RecordsPreviewDrawer"

export const OlderRecordsAccordion = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleAccordionTitleClick = () => {
    setIsOpen(true)
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
            <EmptyAccordionResult />
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
      <RecordsPreviewDrawer open={openRecordDrawer} handleClose={handleCloseRecordPreviewDrawer} record={record} />
    </>
  )
}