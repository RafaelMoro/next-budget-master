import { LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { SUCCESS_CREATE_USER_MESSAGE, SUCCESS_CREATE_USER_SPAN, SUCCESS_CREATE_USER_TITLE, SUCESS_CREATE_USER_SECONDARY_MESSAGE } from "@/shared/constants/Login.constants";
import { AnimateBox } from "@/shared/ui/atoms/AnimateBox";
import { LinkButton } from "@/shared/ui/atoms/LinkButton";
import { Button, Card } from "flowbite-react"

interface ResultCardProps {
  title: string;
  message: string;
  isError: boolean;
  direction: number;
  resetStep: () => void;
}

export const ResultCard = ({ title, message, direction, isError, resetStep }: ResultCardProps) => {
  if (isError) {
    return (
      <AnimateBox direction={direction} >
        <Card className="max-w-[400px]">
          <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white text-balance">
            {title}
          </h5>
          <p className="text-xl text-black dark:text-white text-pretty">{message}</p>
          <div className="flex justify-between">
            <LinkButton href={LOGIN_ROUTE} isSecondary text="Regresar al inicio" />
            <Button onClick={resetStep} className="hover:cursor-pointer">
              Volver a intentar.
            </Button>
          </div>
        </Card>
      </AnimateBox>
    )
  }
  return (
    <AnimateBox direction={direction} >
      <Card className="max-w-[400px]">
        <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white text-balance">
          {SUCCESS_CREATE_USER_TITLE}
          <span className="block">{SUCCESS_CREATE_USER_SPAN}</span>
        </h5>
        <p className="text-xl text-black dark:text-white">
          {SUCCESS_CREATE_USER_MESSAGE}
        </p>
        <p className="text-xl text-black dark:text-white mb-8">{SUCESS_CREATE_USER_SECONDARY_MESSAGE}</p>
          <div className="w-full flex justify-center">
            <LinkButton href={LOGIN_ROUTE} text="Regresar al inicio" />
          </div>
      </Card>
    </AnimateBox>
  )
}