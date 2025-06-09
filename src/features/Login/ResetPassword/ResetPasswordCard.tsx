"use client"
import { AnimatePresence } from "motion/react"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Button, Label, TextInput, Spinner } from "flowbite-react";

import { LinkButton } from "@/shared/ui/atoms/LinkButton";
import { LOGIN_ROUTE } from "@/shared/constants/Global.constants";
import { ResetPasswordData, ResetPasswordError, ResetPasswordFormData, ResetPasswordPayload, ResetPasswordSchema, ResetPasswordStatus } from "@/shared/types/Login.types";
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordCb } from "../Login/LoginCard.utils";
import { CheckIcon } from "@/shared/ui/icons/CheckIcon";
import { GeneralError } from "@/shared/types/Global";

interface ResetPasswordCardProps {
  slug: string;
  toggleMessageCardState: (state: ResetPasswordStatus) => void
}

export const ResetPasswordCard = ({ slug, toggleMessageCardState }: ResetPasswordCardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(ResetPasswordSchema)
  })
  const { mutate: resetPwdMutation, isError, isPending, isSuccess, isIdle, error } = useMutation<ResetPasswordData, ResetPasswordError, ResetPasswordPayload>({
    mutationFn: (data) => resetPasswordCb(data, slug),
    onError: () => {
      toggleMessageCardState("error")
    },
    onSuccess: () => {
      toggleMessageCardState("success")
    }
  })
  const messageError = (error as unknown as GeneralError)?.response?.data?.error?.message

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      const payload: ResetPasswordPayload = {
        password: data.password
      }
      console.log(data)
      resetPwdMutation(payload)
    } catch (error) {
      console.log('error resetting password', error)
    }
  }

  return (
    <AnimatePresence>
      <Card className="max-w-[400px]">
          <p className="text-xl text-black dark:text-white mb-2">
            Ingresa tu nueva contraseña para reestablecer tu contraseña y continuar con el acceso seguro a tu cuenta.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-md flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Nueva Contraseña</Label>
              </div>
              <TextInput
                data-testid="password"
                id="password"
                type="password"
                {...register("password")}
              />
              { errors?.password?.message && (
                <ErrorMessage isAnimated>{errors.password?.message}</ErrorMessage>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              </div>
              <TextInput
                data-testid="confirmPassword"
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
              />
              { errors?.confirmPassword?.message && (
                <ErrorMessage isAnimated>{errors.confirmPassword?.message}</ErrorMessage>
              )}
            </div>
            <LinkButton className="mt-4" text="Volver al inicio" isSecondary href={LOGIN_ROUTE} />
            <Button
              className="hover:cursor-pointer"
              disabled={isPending || isSuccess}
              type="submit"
              >
            { (isIdle || isError) && 'Reestablecer contraseña'}
            { isPending && (<Spinner aria-label="loading reset password budget master" />) }
            { isSuccess && (<CheckIcon />)}
          </Button>
        </form>
        {/* { (isError) && (
          <Toaster position="top-center" />
        )} */}
      </Card>
    </AnimatePresence>
  )
}