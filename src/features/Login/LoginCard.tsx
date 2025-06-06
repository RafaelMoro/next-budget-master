"use client"
import { FormEvent, useState } from "react";
import { Card, Button, Label, TextInput, Spinner } from "flowbite-react";
import { LoginSchema } from "@/shared/types/Login.schema";
import { handleErrorForm } from "@/shared/utils/handleErrorForm";
import { LoginMutationFn, LoginPayload } from "./LoginCard.utils";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon } from "@/shared/ui/icons/CheckIcon";

export const LoginCard =  () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  const getEmailError = (error: string) => {
    setEmailError(error)
  }
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const { mutate: loginMutation, isError, isPending, isSuccess, isIdle, error } = useMutation({
    mutationFn: LoginMutationFn,
    onSuccess: (response) => {
      // Save data in local storage
      console.log('response', response)
    }
  })
  const messageError: string = error?.response?.data?.error?.error

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
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
        getEmailError(infoError.message)
      }
    }
  }

  return ( 
    <Card href="#" className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Ingrese sus credenciales para entrar a su cuenta.
      </h5>
      <form onSubmit={(event) => handleSubmit(event)} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Correo Electrónico</Label>
          </div>
          <TextInput value={email} id="email1" type="email" placeholder="name@flowbite.com" required onChange={handleEmail} />
          { emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Contraseña</Label>
          </div>
          <TextInput value={password} onChange={handlePassword} id="password1" type="password" required />
        </div>
        <Button disabled={isPending || isSuccess} type="submit">
          { isIdle && 'Iniciar sesión'}
          { isPending && (<Spinner aria-label="loading login budget master" />) }
          { isSuccess && (<CheckIcon />)}
        </Button>
      </form>
      { isError && (<p className="text-red-500 text-sm mt-1">{messageError}</p>)}
    </Card>
  )
}