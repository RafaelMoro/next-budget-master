import { LoginCard } from "@/features/Login/LoginCard";
import { Header } from "@/shared/ui/organisms/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold">Bienvenido de vuelta</h1>
        <LoginCard />
      </main>
    </div>
  );
}
