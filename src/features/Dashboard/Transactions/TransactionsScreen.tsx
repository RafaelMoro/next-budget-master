import { TransactionsTable } from "./TransactionsTable"
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider"

export const TransactionsScreen = () => {
  const records = useDashboardStore(
    (state) => state.records
  )

  return (
    <main className="w-full px-4 pt-4 md:min-w-xl mt-3 flex flex-col gap-4">
      <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3">Movimientos de Agosto</h1>
      <p className="text-center text-xl mb-5">Haz click en cualquiera de tus cuentas para ver más en detalle la informacion</p>
      <TransactionsTable records={records} />
    </main>
  )
}