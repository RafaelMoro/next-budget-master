// import { useRouter } from 'next/navigation'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { CURRENT_MONTH_RECORDS_TAG } from "@/shared/constants/Global.constants";
import { getDateInfo } from "@/shared/utils/getDateInfo";

interface RecordViewProps {
  accountId: string
}

export const RecordsView = ({ accountId }: RecordViewProps) => {
  const {
    month, year,
  } = getDateInfo();
  const { isPending, data } = useQuery({
    queryKey: [CURRENT_MONTH_RECORDS_TAG],
    queryFn: async () => {
      const data = axios.post('api/records', {accountId, month, year })
      return data
    },
  })
  console.log('data', data)
  console.log('isPending', isPending)

  return (
    <div>Records</div>
  )
}