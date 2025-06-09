import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Card, Button, Label, TextInput, Spinner } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Toaster } from "sonner";
import { AnimatePresence } from "motion/react";
import { useMutation } from "@tanstack/react-query";

import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage";
import { CheckIcon } from "@/shared/ui/icons/CheckIcon";
import { LinkButton } from "@/shared/ui/atoms/LinkButton";
import { LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { ForgotPasswordData, ForgotPasswordError, ForgotPasswordPayload, ForgotPasswordSchema } from "@/shared/types/Login.types";
import { handleErrorForm } from "@/shared/utils/handleErrorForm";
import { forgotPasswordCb } from "../Login/LoginCard.utils";
import { GeneralError } from "@/shared/types/Global";
import { ERROR_CREATE_USER_TITLE } from "@/shared/constants/Login.constants";

export const ForgotPasswordCard = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>({
    resolver: yupResolver(ForgotPasswordSchema)
  })
  const { mutate: forgotPwdMutation, isError, isPending, isSuccess, isIdle, error } = useMutation<ForgotPasswordData, ForgotPasswordError, ForgotPasswordPayload>({
    mutationFn: forgotPasswordCb,
    onSuccess: () => {
      setTimeout(() => {
        router.push(LOGIN_ROUTE)
      }, 1000)
    }
  })
  const messageError = (error as unknown as GeneralError)?.response?.data?.error?.message

  const onSubmit: SubmitHandler<ForgotPasswordPayload> = async (data) => {
    try {
      forgotPwdMutation(data)
    }
    catch (error: unknown) {
      const infoError = handleErrorForm(error);
      console.error('error in forgot password =>', infoError)
    }
  }

  useEffect(() => {
    if (isError && messageError) {
      toast.error(ERROR_CREATE_USER_TITLE);
      return
    }
  }, [isError, messageError])

  return (
    <AnimatePresence>
      <Card className="max-w-[400px]">
        <p className="text-xl text-black dark:text-white mb-2">Te mandaremos un enlace seguro para que puedas crear una nueva contraseña.</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email">Correo Electrónico</Label>
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="correo-electrónico@gmail.com"
              {...register("email")}
              />
            { errors.email?.message && (
              <ErrorMessage isAnimated>{errors.email?.message}</ErrorMessage>
            )}
          </div>
          <LinkButton className="mt-4" text="Volver" isSecondary href={LOGIN_ROUTE} />
          <Button
            className="hover:cursor-pointer"
            disabled={isPending || isSuccess}
            type="submit"
          >
            { (isIdle || isError) && 'Enviar'}
            { isPending && (<Spinner aria-label="loading login budget master" />) }
            { isSuccess && (<CheckIcon />)}
          </Button>
        </form>
        { (isError) && (
          <Toaster position="top-center" />
        )}
      </Card>
    </AnimatePresence>
  )
}