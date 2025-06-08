"use client"
import { Header } from "@/shared/ui/organisms/Header"
import { ForgotPasswordCard } from "./ForgotPasswordCard"

export const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center gap-20 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Bienvenido de vuelta</h1>
        <ForgotPasswordCard />
      </main>
    </div>
  )
}