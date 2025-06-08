import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Card, Button, Label, TextInput, Spinner } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Toaster } from "sonner";
import { ErrorMessage } from "@/shared/ui/atoms/ErrorMessage";
import { CheckIcon } from "@/shared/ui/icons/CheckIcon";
import { useMutation } from "@tanstack/react-query";

export const ForgotPasswordCard = () => {
  // const router = useRouter()
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginPayload>({
  //   resolver: yupResolver(LoginSchema)
  // })
  // const { mutate: loginMutation, isError, isPending, isSuccess, isIdle, error } = useMutation<LoginData, LoginError, LoginPayload>({
  //   mutationFn: LoginMutationFn,
  //   onSuccess: () => {
  //     setTimeout(() => {
  //       router.push(DASHBOARD_ROUTE)
  //     }, 1000)
  //   }
  // })
  // const messageError = error?.response?.data?.message

  // const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
  //   try {
  //     const dataForm = {
  //       email: data.email,
  //       password: data.password
  //     }
  //     loginMutation(dataForm)
  //   }
  //   catch (error: unknown) {
  //     const infoError = handleErrorForm(error);
  //     console.error('error while logging in =>', infoError)
  //   }
  // }

  // useEffect(() => {
  //   if (isError && messageError) {
  //     if (messageError === ERROR_UNAUTHORIZED_LOGIN) {
  //       toast.error(ERROR_UNAUTHORIZED_LOGIN_MESSAGE);
  //       return
  //     }
  //     toast.error(ERROR_CREATE_USER_TITLE);
  //   }
  // }, [isError, messageError])

  return (
    <Card className="max-w-sm">
      <h5 className="text-2xl text-gray-900 dark:text-white">
        Ingrese sus credenciales para entrar a su cuenta.
      </h5>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Correo Electrónico</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="correo-electrónico@gmail.com"
            // {...register("email")}
            />
          {/* { errors.email?.message && (
            <ErrorMessage isAnimated>{errors.email?.message}</ErrorMessage>
          )} */}
        </div>
        <Button
          className="hover:cursor-pointer"
          // disabled={isPending || isSuccess}
          type="submit"
        >
          Iniciar sesión
          {/* { (isIdle || isError) && 'Iniciar sesión'}
          { isPending && (<Spinner aria-label="loading login budget master" />) }
          { isSuccess && (<CheckIcon />)} */}
        </Button>
      </form>
      {/* { (isError) && (
        <Toaster position="top-center" />
      )} */}
    </Card>
  )
}