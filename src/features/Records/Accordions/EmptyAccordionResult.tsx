"use client"
import { useDashboard } from "@/shared/hooks/useDashboard"
import { Button } from "flowbite-react"

export const EmptyAccordionResult = () => {
  const { handleGoCreateRecordRoute } = useDashboard()

  return (
    <div className="flex flex-col gap-5 justify-center">
      <p>Aún no has registrado movimientos este mes</p>
      <Button onClick={handleGoCreateRecordRoute} >Registrar movimiento</Button>
    </div>
  )
}