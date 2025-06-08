"use client"
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Card, Button, Label, TextInput, Spinner } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from 'sonner'
import { motion, AnimatePresence } from "motion/react"

import { handleErrorForm } from "@/shared/utils/handleErrorForm";
import { CheckIcon } from "@/shared/ui/icons/CheckIcon";
import { ERROR_UNAUTHORIZED_LOGIN, ERROR_UNAUTHORIZED_LOGIN_MESSAGE, LoginError, LoginSchema } from "@/shared/types/Login.types";
import { LoginMutationFn } from "./LoginCard.utils";
import { DASHBOARD_ROUTE, ERROR_CREATE_USER_TITLE } from "@/shared/constants/Global.constants";
import { LoginData, LoginPayload } from "@/shared/types/Login.types";

export const LoginCard =  () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(LoginSchema)
  })
  const { mutate: loginMutation, isError, isPending, isSuccess, isIdle, error } = useMutation<LoginData, LoginError, LoginPayload>({
    mutationFn: LoginMutationFn,
    onSuccess: () => {
      setTimeout(() => {
        router.push(DASHBOARD_ROUTE)
      }, 1000)
    }
  })
  const messageError = error?.response?.data?.message

  const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
    try {
      const dataForm = {
        email: data.email,
        password: data.password
      }
      loginMutation(dataForm)
    }
    catch (error: unknown) {
      const infoError = handleErrorForm(error);
      console.error('error while logging in =>', infoError)
    }
  }

  useEffect(() => {
    if (isError && messageError) {
      if (messageError === ERROR_UNAUTHORIZED_LOGIN) {
        toast.error(ERROR_UNAUTHORIZED_LOGIN_MESSAGE);
        return
      }
      toast.error(ERROR_CREATE_USER_TITLE);
    }
  }, [isError, messageError])

  return (
    <AnimatePresence>
      <Card className="max-w-sm">
        <h5 className="text-2xl text-gray-900 dark:text-white">
          Ingrese sus credenciales para entrar a su cuenta.
        </h5>
        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email">Correo Electrónico</Label>
            </div>
            <TextInput id="email" type="email" placeholder="correo-electrónico@gmail.com" {...register("email")} />
            { errors.email?.message && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-500 text-sm mt-1">{errors.email?.message}</motion.p>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <TextInput id="password" type="password" {...register("password")} />
            { errors.password?.message && (
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            )}
          </div>
          <Link className="relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm border border-primary-700 text-primary-700 hover:border-primary-800 hover:bg-primary-800 hover:text-white focus:ring-primary-300 dark:border-primary-600 dark:text-primary-500 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white dark:focus:ring-primary-800" href="/register">Registrarse</Link>
          <Button className="hover:cursor-pointer" disabled={isPending || isSuccess} type="submit">
            { (isIdle || isError) && 'Iniciar sesión'}
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