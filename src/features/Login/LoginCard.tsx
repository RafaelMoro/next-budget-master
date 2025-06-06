"use client"
import { FormEvent, useState, useEffect } from "react";
import { Card, Button, Label, TextInput, Spinner } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from 'next/navigation'

import { handleErrorForm } from "@/shared/utils/handleErrorForm";
import { CheckIcon } from "@/shared/ui/icons/CheckIcon";
import { ERROR_UNAUTHORIZED_LOGIN, ERROR_UNAUTHORIZED_LOGIN_MESSAGE, LoginError, LoginSchema } from "@/shared/types/Login.types";
import { LoginData, LoginMutationFn, LoginPayload } from "./LoginCard.utils";
import { DASHBOARD_ROUTE } from "@/shared/types/Global";

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
      const data: LoginPayload = LoginSchema.parse(dataForm)
      loginMutation(data)
    }
    catch (error: unknown) {
      const infoError = handleErrorForm(error);
      if (infoError.path.includes('email')) {
        setEmailError(infoError.message)
      }
      if (infoError.path.includes('password')) {
        setPasswordError(infoError.message)
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
            <Label htmlFor="email1">Correo Electrónico</Label>
          </div>
          <TextInput value={email} id="email1" type="email" placeholder="correo-electrónico@gmail.com" onChange={handleEmail} />
          { emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Contraseña</Label>
          </div>
          <TextInput value={password} onChange={handlePassword} id="password1" type="password" />
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