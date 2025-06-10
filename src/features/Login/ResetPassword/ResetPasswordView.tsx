"use client"
import { useState } from "react"

import { Header } from "@/shared/ui/organisms/Header"
import { ResetPasswordCard } from "./ResetPasswordCard"
import { PasswordResetStatusCard } from "./PasswordResetStatusCard"
import { MessageCardState, ResetPasswordStatus } from "@/shared/types/Login.types"

export interface ResetPasswordProps {
  slug: string
}

export const ResetPasswordView = ({ slug }: ResetPasswordProps) => {
  const [messageCardState, setmessageCardState] = useState<MessageCardState>({
    show: false,
    status: "idle"
  })
  const toggleMessageCardState = (state: ResetPasswordStatus) => {
    setmessageCardState({ show: true, status: state })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center gap-20 min-h-full">
        { !messageCardState.show && (
          <h1 className="text-black dark:text-white text-4xl text-center font-bold">
            Estás a un paso de volver
          </h1>
        ) }
        { messageCardState.show && (
          <h1 className="text-black dark:text-white text-4xl text-center font-bold">
            { messageCardState.status === "success" ? "🟢 ¡Contraseña cambiada con éxito!" : "🚫 No pudimos restablecer tu contraseña"}
          </h1>
        ) }
        { !messageCardState.show && (<ResetPasswordCard slug={slug} toggleMessageCardState={toggleMessageCardState} />) }
        { messageCardState.show && (<PasswordResetStatusCard status={messageCardState.status} />) }
      </main>
    </div>
  )
}