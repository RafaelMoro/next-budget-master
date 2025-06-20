import { GetCurrentMonthRecordsResponse } from "../types/records.types"

export const getRecordsCurrentMonthError = (message: string): GetCurrentMonthRecordsResponse => {
  return {
    detailedError: {
      message
    },
    records: []
  }
}