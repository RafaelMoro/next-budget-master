import { Card, Button, Checkbox, Label, TextInput } from "flowbite-react";

export const LoginCard = () => {
  return (
    <Card href="#" className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Ingrese sus credenciales para entrar a su cuenta.
      </h5>
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1">Correo Electrónico</Label>
          </div>
          <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Contraseña</Label>
          </div>
          <TextInput id="password1" type="password" required />
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