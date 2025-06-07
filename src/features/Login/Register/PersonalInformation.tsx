"use client"
import { FormEvent, useState } from "react";
import { Card, Button, Label, TextInput } from "flowbite-react";

export const PersonalInformation = () => {
  const [firstName, setfirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => setfirstName(event.target.value);
  const handleChangeMiddletName = (event: React.ChangeEvent<HTMLInputElement>) => setMiddleName(event.target.value);
  const handleChangeLasttName = (event: React.ChangeEvent<HTMLInputElement>) => setLastName(event.target.value);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl text-gray-900 dark:text-white">
        Ingrese sus credenciales para entrar a su cuenta.
      </h5>
      <form onSubmit={(event) => handleSubmit(event)} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName">Primer Nombre</Label>
          </div>
          <TextInput value={firstName} id="firstName" type="text" onChange={handleChangeFirstName} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="middleName">Segundo Nombre (Opcional)</Label>
          </div>
          <TextInput value={middleName} id="middleName" type="text" onChange={handleChangeMiddletName} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="middleName">Apellido</Label>
          </div>
          <TextInput value={lastName} onChange={handleChangeLasttName} id="middleName" type="text" />
        </div>
        <Button className="hover:cursor-pointer" outline>Volver</Button>
        <Button className="hover:cursor-pointer">
          Siguiente
        </Button>
      </form>
    </Card>
  )
}