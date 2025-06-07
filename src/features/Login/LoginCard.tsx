"use client"
import { FormEvent, useState, useEffect } from "react";
import { Card, Button, Label, TextInput, Spinner } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'

import { handleErrorForm } from "@/shared/utils/handleErrorForm";
import { CheckIcon } from "@/shared/ui/icons/CheckIcon";
import { ERROR_EMAIL_REQUIRED, ERROR_INVALID_EMAIL, ERROR_PASSWORD_REQUIRED, ERROR_UNAUTHORIZED_LOGIN, ERROR_UNAUTHORIZED_LOGIN_MESSAGE, LoginError, LoginSchema } from "@/shared/types/Login.types";
import { LoginMutationFn } from "./LoginCard.utils";
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants";
import { LoginData, LoginPayload } from "@/shared/types/Login.types";

export const LoginCard =  () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorAuth, setErrorAuth] = useState("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const { mutate: loginMutation, isError, isPending, isSuccess, isIdle, error } = useMutation<LoginData, LoginError, LoginPayload>({
    mutationFn: LoginMutationFn,
    onSuccess: () => {
      setTimeout(() => {
        router.push(DASHBOARD_ROUTE)
      }, 1000)
    }
  })
  const messageError = error?.response?.data?.error?.error

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      // Reset errors
      setErrorAuth("");
      setEmailError("");
      setPasswordError("");

      // Validate form
      const dataForm = {
        email,
        password
      }
      const data: LoginPayload = await LoginSchema.validate(dataForm, { strict: true })
      loginMutation(data)
    }
    catch (error: unknown) {
      const infoError = handleErrorForm(error);
      console.error('error while logging in =>', infoError)
      if (infoError.message === ERROR_PASSWORD_REQUIRED) {
        setPasswordError(infoError.message)
      }
      if (infoError.message === ERROR_EMAIL_REQUIRED || infoError.message === ERROR_INVALID_EMAIL) {
        setEmailError(infoError.message)
      }
    }
  }

  useEffect(() => {
    if (isError && messageError) {
      if (messageError === ERROR_UNAUTHORIZED_LOGIN) {
        setErrorAuth(ERROR_UNAUTHORIZED_LOGIN_MESSAGE);
      }
    }
  }, [messageError, isError])

  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl text-gray-900 dark:text-white">
        Ingrese sus credenciales para entrar a su cuenta.
      </h5>
      <form onSubmit={(event) => handleSubmit(event)} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Correo Electrónico</Label>
          </div>
          <TextInput value={email} id="email" type="email" placeholder="correo-electrónico@gmail.com" onChange={handleEmail} />
          { emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <TextInput value={password} onChange={handlePassword} id="password" type="password" />
          { passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>
        <Button disabled={isPending || isSuccess} type="submit">
          { (isIdle || isError) && 'Iniciar sesión'}
          { isPending && (<Spinner aria-label="loading login budget master" />) }
          { isSuccess && (<CheckIcon />)}
        </Button>
      </form>
      { isError && (<p className="text-red-500 text-sm mt-1">{errorAuth}</p>)}
    </Card>
  )
}