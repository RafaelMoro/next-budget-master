import { BankMovement } from "@/shared/types/records.types";
import { IncomeExpensesChart } from "../Charts/IncomeExpensesChart"
import { NO_RECORDS_FOUND } from "@/shared/constants/records.constants";

interface StatisticsViewProps {
  records: BankMovement[];
  message: string | null;
}

export const StatisticsView = ({ records, message }: StatisticsViewProps) => {
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