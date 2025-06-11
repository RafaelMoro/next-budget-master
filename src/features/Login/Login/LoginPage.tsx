"use client"
import { useRouter } from 'next/navigation'
import { LoginCard } from "./LoginCard";
import { Header } from "@/shared/ui/organisms/Header";
import { DASHBOARD_ROUTE } from '@/shared/constants/Global.constants';

interface LoginPageProps {
  accessToken: string;
}

export const LoginPage = ({ accessToken }: LoginPageProps) => {
  const router = useRouter()
  if (accessToken) {
    router.push(DASHBOARD_ROUTE)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center gap-20 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Bienvenido de vuelta</h1>
        <LoginCard />
      </main>
    </div>
  )
}