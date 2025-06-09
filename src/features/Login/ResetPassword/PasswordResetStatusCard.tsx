import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { ResetPasswordStatus } from "@/shared/types/Login.types";
import { LinkButton } from "@/shared/ui/atoms/LinkButton";
import { Card } from "flowbite-react";

interface PasswordResetStatusCardProps {
  status: ResetPasswordStatus;
}

export const PasswordResetStatusCard =({ status }: PasswordResetStatusCardProps) => {
  return (
    <Card className="max-w-[400px] gap-8">
      <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white text-balance">
        { status === "success" ? "🟢 ¡Contraseña cambiada con éxito!" : "🚫 No pudimos restablecer tu contraseña"}
      </h5>
      <p className="text-xl text-black dark:text-white text-pretty">
        { status === 'success' ?
          "Tu nueva contraseña ya está activa. Inicia sesión y sigue conquistando tus finanzas."
          : "Parece que hubo un problema. Vuelve a iniciar el proceso desde “Olvidé mi contraseña” y lo resolvemos en segundos." }
      </p>
      { status === "error" && (<LinkButton href={FORGOT_PASSWORD_ROUTE} text="Ir a olvidé mi contraseña" />) }
      <LinkButton href={LOGIN_ROUTE} isSecondary={status === "error"} text="Regresar al inicio" />
    </Card>
  )
}