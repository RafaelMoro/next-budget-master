"use client"
import { FormEvent, Fragment, useState } from "react"
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, HR } from "flowbite-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

import { EmptyAccordionResult } from "./EmptyAccordionResult"
import { useRecordPreview } from "@/shared/hooks/useRecordPreview"
import { RecordsPreviewDrawer } from "../RecordsPreviewDrawer"
import { DateRangeSearchPanel } from "@/shared/ui/molecules/DateRangeSearchPanel"
import { useSelectMonth } from "@/shared/hooks/useSelectMonth"
import { useSelectYear } from "@/shared/hooks/useSelectYear"
import { GetRecordsResponse } from "@/shared/types/records.types";
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider";
import { OLDER_RECORDS_TAG } from "@/shared/constants/Global.constants";
import { RecordEntrySkeleton } from "../RecordEntrySkeleton";
import { RecordEntry } from "../RecordEntry";

export const OlderRecordsAccordion = () => {
  const selectedAccount = useDashboardStore(
    (state) => state.selectedAccount
  )
  const [isOpen, setIsOpen] = useState(false)
  const handleAccordionTitleClick = () => {
    setIsOpen(true)
  }

  const { selectedMonth, updateSelectMonth, allMonths } = useSelectMonth({ isOlderRecords: true })
  const { selectedYear, updateSelectYear } = useSelectYear({ isOlderRecords: true })

  const { data, isPending, isSuccess, refetch } = useQuery({
    queryKey: [OLDER_RECORDS_TAG, selectedAccount?._id],
    queryFn: async () => {
      const res: GetRecordsResponse = await axios.post('api/records', { accountId: selectedAccount?._id, month: selectedMonth, year: selectedYear })
      return res?.data.data
    },
    enabled: isOpen,
  })
  const records = data?.records ?? []

  const handleSubmitGetRecord = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    refetch()
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
            <div className="mb-5">
                <DateRangeSearchPanel
                  allMonths={allMonths}
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  handleSubmit={handleSubmitGetRecord}
                  changeSelectedMonth={updateSelectMonth}
                  changeSelectedYear={updateSelectYear}
                />
              </div>
              { isPending && Array.from({ length: 3 }).map((_, index) => (
                <RecordEntrySkeleton key={index} />
              ))}
              { (records.length > 0 && isSuccess) && records.map((record, index) => (
                <Fragment key={record._id}>
                  <RecordEntry record={record} handleOpenRecordPreviewDrawer={handleOpenRecordPreviewDrawer} />
                  {index !== (records.length - 1) && <HR />}
                </Fragment>
              ))}
              { (records.length === 0 && isSuccess) && (
                <EmptyAccordionResult />
              )}
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
      <RecordsPreviewDrawer open={openRecordDrawer} handleClose={handleCloseRecordPreviewDrawer} record={record} />
    </>
  )
}