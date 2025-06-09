"use client"
import { AnimatePresence } from "motion/react"
import { Card, Button, Label, TextInput, Spinner } from "flowbite-react";
import { LinkButton } from "@/shared/ui/atoms/LinkButton";
import { LOGIN_ROUTE } from "@/shared/constants/Global.constants";

export const ResetPasswordCard = () => {
  return (
    <AnimatePresence>
      <Card className="max-w-[400px]">
          <p className="text-xl text-black dark:text-white mb-2">
            Ingresa tu nueva contraseña para reestablecer tu contraseña y continuar con el acceso seguro a tu cuenta.
          </p>
          <form
            // onSubmit={handleSubmit(onSubmit)}
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
                // {...register("password")}
              />
              {/* { errors?.password?.message && (
                <ErrorMessage isAnimated>{errors.password?.message}</ErrorMessage>
              )} */}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              </div>
              <TextInput
                data-testid="confirmPassword"
                type="password"
                id="confirmPassword"
                // {...register("confirmPassword")}
              />
              {/* { errors?.confirmPassword?.message && (
                <ErrorMessage isAnimated>{errors.confirmPassword?.message}</ErrorMessage>
              )} */}
            </div>
            <LinkButton className="mt-4" text="Volver al inicio" isSecondary href={LOGIN_ROUTE} />
            <Button
              className="hover:cursor-pointer"
              // disabled={isPending || isSuccess}
              type="submit"
              >
              Reestablecer contraseña
            {/* { (isIdle || isError) && 'Enviar'}
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