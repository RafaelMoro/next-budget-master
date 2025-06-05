"use client"
import { FormEvent, useState } from "react";
import { Card, Button, Label, TextInput } from "flowbite-react";
import { LoginSchema } from "@/shared/types/Login.schema";
import { handleErrorForm } from "@/shared/utils/handleErrorForm";

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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      // logic handle submit
      console.log('email', email)
      console.log('password', password)
      const dataForm = {
        email,
        password
      }
      const data = LoginSchema.parse(dataForm)
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
        <Button type="submit">Iniciar sesión</Button>
      </form>
    </Card>
  )
}