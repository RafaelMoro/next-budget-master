"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Button, Label, TextInput } from "flowbite-react";

import { InputsUserPassword, UserAndPasswordSchema } from "@/shared/types/Login.types";

interface UserRegistrationFormProps {
  goBack: () => void;
  goNext: () => void;
  submitForm: () => void;
  updateUserPasswordInfo: (data: InputsUserPassword) => void;
}

export const UserRegistrationForm = ({ goBack, updateUserPasswordInfo, goNext, submitForm }: UserRegistrationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsUserPassword>({
    resolver: yupResolver(UserAndPasswordSchema)
  })

  const onSubmit: SubmitHandler<InputsUserPassword> = (data) => {
    updateUserPasswordInfo(data)
    goNext()
    submitForm()
  }

  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
        Crear cuenta.
      </h5>
      <p className="text-xl text-black dark:text-white">Ingrese su correo electronico y contraseña.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Correo electrónico</Label>
          </div>
          <TextInput id="email" type="email" {...register("email")} />
          { errors?.email?.message && (
            <p className="text-red-500 text-sm mt-1">{errors?.email?.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <TextInput id="password" type="password" {...register("password")} />
          { errors?.password?.message && (
            <p className="text-red-500 text-sm mt-1">{errors?.password?.message}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="confirmPasswprd">Confirmar Contraseña</Label>
          </div>
          <TextInput type="password" id="confirmPassword" {...register("confirmPassword")} />
          { errors?.confirmPassword?.message && (
            <p className="text-red-500 text-sm mt-1">{errors?.confirmPassword?.message}</p>
          )}
        </div>
        <Button className="hover:cursor-pointer" outline onClick={goBack}>Regresar</Button>
        <Button type="submit" className="hover:cursor-pointer">
          Crear cuenta
        </Button>
      </form>
    </Card>
  )
}