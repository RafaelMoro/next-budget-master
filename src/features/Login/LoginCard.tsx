"use client"
import { FormEvent, useState } from "react";
import { Card, Button, Checkbox, Label, TextInput } from "flowbite-react";
import { LoginSchema } from "@/shared/types/Login.schema";
import { type ZodError } from "@/shared/types/Global";

export const LoginCard =  () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const currentError = error as ZodError
      const infoError = {
        message: currentError.message,
        path: currentError.path,
        code: currentError.code,
      }
      console.log('error', infoError)
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
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Contraseña</Label>
          </div>
          <TextInput value={password} onChange={handlePassword} id="password1" type="password" required />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Recordar cuenta</Label>
        </div>
        <Button type="submit">Iniciar sesión</Button>
      </form>
    </Card>
  )
}