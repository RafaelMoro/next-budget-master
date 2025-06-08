import { LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { AnimateBox } from "@/shared/ui/atoms/AnimateBox";
import { LinkButton } from "@/shared/ui/atoms/LinkButton";
import { Button, Card } from "flowbite-react"

interface ResultCardProps {
  title: string;
  message: string;
  isError: boolean;
  isSuccess: boolean;
  direction: number;
  resetStep: () => void;
}

export const ResultCard = ({ title, message, direction, isError, isSuccess, resetStep }: ResultCardProps) => {
  return (
    <AnimateBox direction={direction} >
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="text-xl text-black dark:text-white">{message}</p>
          { isError && (
            <div className="flex justify-between">
              <LinkButton href={LOGIN_ROUTE} isSecondary text="Regresar al inicio" />
              <Button onClick={resetStep} className="hover:cursor-pointer">
                Volver a intentar.
              </Button>
            </div>
          )}
          { isSuccess && (
            <div className="w-full flex justify-center">
              <LinkButton href={LOGIN_ROUTE} text="Regresar al inicio" />
            </div>
          )}
      </Card>
    </AnimateBox>
  )
}