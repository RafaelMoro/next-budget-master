// import { useRouter } from 'next/navigation'
import { Fragment } from "react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Badge } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { CURRENT_MONTH_RECORDS_TAG } from "@/shared/constants/Global.constants";
import { getDateInfo } from "@/shared/utils/getDateInfo";
import { GetRecordsResponse } from "@/shared/types/records.types";

interface RecordViewProps {
  accountId: string
}

export const RecordsView = ({ accountId }: RecordViewProps) => {
  const {
    month, year,
  } = getDateInfo();
  const { isPending, data: records } = useQuery({
    queryKey: [CURRENT_MONTH_RECORDS_TAG],
    queryFn: async () => {
      const res: GetRecordsResponse = await axios.post('api/records', {accountId, month, year })
      return res?.data.data.records
    },
  })
  console.log('data', records)
  console.log('isPending', isPending)

  return (
    <Accordion>
      <AccordionPanel>
        <AccordionTitle>Este mes</AccordionTitle>
          <AccordionContent>
            {(records ?? []).map((record) => (
              <Fragment key={record._id}>
                  <p>{record.shortName}</p>
                  <p>{record.description}</p>
                  {record.isPaid ? (
                    <div>
                      <Badge color="green">Paid</Badge>
                    </div>
                  ) : (
                    <div>
                      <Badge color="red">Unpaid</Badge>
                    </div>
                  )}
              </Fragment>
            ))}
          </AccordionContent>
      </AccordionPanel>
    </Accordion>
  )
}