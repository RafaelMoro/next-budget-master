"use client"
import { Header } from "@/shared/ui/organisms/Header"

export interface ResetPasswordProps {
  slug: string
}

export const ResetPassword = ({ slug }: ResetPasswordProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center gap-20 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Recupera tu cuenta en un momento</h1>
        <p className="text-2xl text-white">Reset password form with slug {slug}</p>
      </main>
    </div>
  )
}