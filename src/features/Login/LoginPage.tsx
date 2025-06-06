"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginCard } from "./LoginCard";
import { Header } from "@/shared/ui/organisms/Header";

const queryClient = new QueryClient()

export const LoginPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col justify-center items-center gap-20 min-h-full">
          <h1 className="text-black dark:text-white text-4xl text-center font-bold">Bienvenido de vuelta</h1>
          <LoginCard />
        </main>
      </div>
    </QueryClientProvider>
  )
}