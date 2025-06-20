import { IncomeExpensesChart } from "../../../Charts/IncomeExpensesChart"
import { NO_RECORDS_FOUND } from "@/shared/constants/records.constants";
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider";

interface StatisticsViewProps {
  message: string | null;
}

export const StatisticsSubscreen = ({ message }: StatisticsViewProps) => {
  const records = useDashboardStore(
    (state) => state.records
  )
  if (message === NO_RECORDS_FOUND) {
    return (
      <div>
        <h2>No has creado transacciones en esta cuenta para este mes.</h2>
        <p>Empieza a crear una ahora</p>
      </div>
    )
  }
  return (
    <IncomeExpensesChart records={records} />
  )
}