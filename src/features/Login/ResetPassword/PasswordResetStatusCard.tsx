import { LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { LinkButton } from "@/shared/ui/atoms/LinkButton";
import { Card } from "flowbite-react";

interface PasswordResetStatusCardProps {
  status: 'success' | 'error';
}

export const PasswordResetStatusCard =({ status }: PasswordResetStatusCardProps) => {
  return (
    <Card className="max-w-[400px]">
      <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white text-balance">
        ¡Contraseña cambiada con éxito!
      </h5>
      <p className="text-xl text-black dark:text-white text-pretty">Tu nueva contraseña ya está activa. Inicia sesión y sigue conquistando tus finanzas.</p>
      <LinkButton href={LOGIN_ROUTE} text="Regresar al inicio" />
    </Card>
  )
}