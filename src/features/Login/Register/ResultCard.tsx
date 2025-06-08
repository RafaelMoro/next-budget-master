import { LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { Button, Card } from "flowbite-react"
import Link from "next/link";

interface ResultCardProps {
  title: string;
  message: string;
  isError: boolean;
  isSuccess: boolean;
}

export const ResultCard = ({ title, message, isError, isSuccess }: ResultCardProps) => {
  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="text-xl text-black dark:text-white">{message}</p>
        { isError && (
          <div className="flex justify-between">
            <Link
              className="relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm border border-primary-700 text-primary-700 hover:border-primary-800 hover:bg-primary-800 hover:text-white focus:ring-primary-300 dark:border-primary-600 dark:text-primary-500 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white dark:focus:ring-primary-800"
              href={LOGIN_ROUTE}
            >Regresar al inicio</Link>
            <Button className="hover:cursor-pointer">
              Volver a intentar.
            </Button>
          </div>
        )}
        { isSuccess && (
          <div className="w-full flex justify-center">
            <Link
              className="relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm border border-primary-700 text-primary-700 hover:border-primary-800 hover:bg-primary-800 hover:text-white focus:ring-primary-300 dark:border-primary-600 dark:text-primary-500 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white dark:focus:ring-primary-800"
              href={LOGIN_ROUTE}
            >Regresar al inicio</Link>
          </div>
        )}
    </Card>
  )
}