import { IncomeExpensesChart } from "../../../Charts/IncomeExpensesChart"
import { NO_RECORDS_FOUND } from "@/shared/constants/records.constants";
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider";
import { Button } from "flowbite-react";

interface StatisticsViewProps {
  message: string | null;
}

export const StatisticsSubscreen = ({ message }: StatisticsViewProps) => {
  const records = useDashboardStore(
    (state) => state.records
  )
  if (message === NO_RECORDS_FOUND) {
    return (
      <div className="flex flex-col justify-center gap-5 mt-20">
        <h2 className="text-2xl font-semibold text-center">Sin transacciones, sin gráficas... ¡por el momento!</h2>
        <p className="text-gray-400 text-center mb-5">Aún no podemos generar gráficas sin movimientos... ¡empieza a registrar y verás el cambio!</p>
        <div className="mx-auto my-0">
          <Button>Registrar movimiento</Button>
        </div>
      </div>
    )
  }
  return (
    <IncomeExpensesChart records={records} />
  )
}