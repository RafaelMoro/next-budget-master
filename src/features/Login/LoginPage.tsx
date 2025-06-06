"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginCard } from "./LoginCard";

const queryClient = new QueryClient()

export const LoginPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex-1 flex flex-col justify-center items-center gap-5 min-h-full">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Bienvenido de vuelta</h1>
        <LoginCard />
      </main>
    </QueryClientProvider>
  )
}