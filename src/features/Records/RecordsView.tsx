"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { CURRENT_MONTH_RECORDS_TAG } from "@/shared/constants/Global.constants";
import { getDateInfo } from "@/shared/utils/getDateInfo";
import { GetRecordsResponse } from "@/shared/types/records.types";
import { MonthAccordionRecords } from "./CurrentMonthAccordionRecords";

interface RecordViewProps {
  accountId: string
}

export const RecordsView = ({ accountId }: RecordViewProps) => {
  const {
    month, year,
  } = getDateInfo();
  const { data: records = [] } = useQuery({
    queryKey: [CURRENT_MONTH_RECORDS_TAG],
    queryFn: async () => {
      const res: GetRecordsResponse = await axios.post('api/records', {accountId, month, year })
      return res?.data.data.records
    },
  })

  return (
    <MonthAccordionRecords records={records} title="Este mes" />
  )
}