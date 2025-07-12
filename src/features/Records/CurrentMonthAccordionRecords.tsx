import { BankMovement } from "@/shared/types/records.types"
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Button, HR } from "flowbite-react"
import { Fragment } from "react";
import { RecordEntry } from "./RecordEntry";
import { useDashboard } from "@/shared/hooks/useDashboard";

interface CurrentMonthAccordionRecordsProps {
  records: BankMovement[];
  title: string
}

/**
 * This component is only visual receiving the records and show the in the accordion
 * @param records - Records fetched of any month
 * @returns The accordion showing the records
 */
export const MonthAccordionRecords = ({ records, title }: CurrentMonthAccordionRecordsProps) => {
  const { handleGoCreateRecordRoute } = useDashboard()

  return (
    <Accordion className="max-w-3xl">
      <AccordionPanel>
        <AccordionTitle>{title}</AccordionTitle>
          <AccordionContent>
            { records.length > 0 && records.map((record, index) => (
              <Fragment key={record._id}>
                <RecordEntry record={record} />
                {index !== (records.length - 1) && <HR />}
              </Fragment>
            ))}
            { records.length === 0 && (
              <div className="flex flex-col gap-5 justify-center">
                <p>Aún no has registrado movimientos este mes</p>
                <Button onClick={handleGoCreateRecordRoute} >Registrar movimiento</Button>
              </div>
            )}
          </AccordionContent>
      </AccordionPanel>
    </Accordion>
  )
}