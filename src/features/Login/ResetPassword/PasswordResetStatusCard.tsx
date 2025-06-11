import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { ResetPasswordStatus } from "@/shared/types/login.types";
import { LinkButton } from "@/shared/ui/atoms/LinkButton";
import { Card } from "flowbite-react";

interface PasswordResetStatusCardProps {
  status: ResetPasswordStatus;
}

export const PasswordResetStatusCard =({ status }: PasswordResetStatusCardProps) => {
  return (
    <Card className="max-w-[400px]">
      <div className="flex flex-col gap-12">
        <p className="text-xl text-black dark:text-white text-pretty">
          { status === 'success' ?
            "Tu nueva contraseña ya está activa."
            : "Parece que hubo un problema." }
        </p>
        <p className="text-xl text-black dark:text-white text-pretty">
          { status === 'success' ?
            "Inicia sesión y sigue conquistando tus finanzas."
            : "Vuelve a iniciar el proceso desde “Olvidé mi contraseña” y lo resolvemos en segundos." }
        </p>
        <div>
          { status === "error" && (<LinkButton className="mb-5" href={FORGOT_PASSWORD_ROUTE} text="Ir a olvidé mi contraseña" />) }
          <LinkButton href={LOGIN_ROUTE} isSecondary={status === "error"} text="Regresar al inicio" />
        </div>
      </div>
    </Card>
  )
}