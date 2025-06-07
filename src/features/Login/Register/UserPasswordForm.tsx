"use client"
import { FormEvent, useState } from "react";
import { Card, Button, Label, TextInput } from "flowbite-react";

interface UserRegistrationFormProps {
  goBack: () => void;
}

export const UserRegistrationForm = ({ goBack }: UserRegistrationFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswprd, setConfirmPassword] = useState("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Crear cuenta.
      </h5>
      <p className="text-xl text-black dark:text-white">Ingrese su correo electronico y contraseña.</p>
      <form onSubmit={(event) => handleSubmit(event)} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Correo electrónico</Label>
          </div>
          <TextInput value={email} id="email" type="email" onChange={handleEmail} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <TextInput value={password} id="password" type="password" onChange={handlePassword} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPasswprd">Confirmar Contraseña</Label>
          </div>
          <TextInput value={confirmPasswprd} type="password" onChange={handleConfirmPassword} id="confirmPasswprd" />
        </div>
        <Button className="hover:cursor-pointer" outline onClick={goBack}>Regresar</Button>
        <Button className="hover:cursor-pointer">
          Crear cuenta
        </Button>
      </form>
    </Card>
  )
}