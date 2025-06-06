"use client"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { LoginCard } from "@/features/Login/LoginCard";
import { Header } from "@/shared/ui/organisms/Header";

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <main className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-black dark:text-white text-4xl text-center font-bold">Bienvenido de vuelta</h1>
          <LoginCard />
        </main>
      </div>
    </QueryClientProvider>
  );
}
