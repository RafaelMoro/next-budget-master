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
import { ForgotPasswordPayload, ForgotPasswordSchema } from "@/shared/types/Login.types";
import { handleErrorForm } from "@/shared/utils/handleErrorForm";

export const ForgotPasswordCard = () => {
  // const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>({
    resolver: yupResolver(ForgotPasswordSchema)
  })
  // const { mutate: loginMutation, isError, isPending, isSuccess, isIdle, error } = useMutation<LoginData, LoginError, LoginPayload>({
  //   mutationFn: LoginMutationFn,
  //   onSuccess: () => {
  //     setTimeout(() => {
  //       router.push(DASHBOARD_ROUTE)
  //     }, 1000)
  //   }
  // })
  // const messageError = error?.response?.data?.message

  const onSubmit: SubmitHandler<ForgotPasswordPayload> = async (data) => {
    try {
      console.log(data)
      // const dataForm = {
      //   email: data.email,
      //   password: data.password
      // }
      // loginMutation(dataForm)
    }
    catch (error: unknown) {
      const infoError = handleErrorForm(error);
      console.error('error in forgot password =>', infoError)
    }
  }

  // useEffect(() => {
  //   if (isError && messageError) {
  //     if (messageError === ERROR_UNAUTHORIZED_LOGIN) {
  //       toast.error(ERROR_UNAUTHORIZED_LOGIN_MESSAGE);
  //       return
  //     }
  //     toast.error(ERROR_CREATE_USER_TITLE);
  //   }
  // }, [isError, messageError])

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
            // disabled={isPending || isSuccess}
            type="submit"
          >
            Enviar
            {/* { (isIdle || isError) && 'Iniciar sesión'}
            { isPending && (<Spinner aria-label="loading login budget master" />) }
            { isSuccess && (<CheckIcon />)} */}
          </Button>
        </form>
        {/* { (isError) && (
          <Toaster position="top-center" />
        )} */}
      </Card>
    </AnimatePresence>
  )
}