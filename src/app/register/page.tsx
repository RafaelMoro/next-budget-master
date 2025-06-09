"use client"
import { useMutation } from "@tanstack/react-query"
import { useRef } from "react"

import { createUserCb } from "@/features/Login/Login/LoginCard.utils"
import { PersonalInformation } from "@/features/Login/Register/PersonalInformation"
import { UserRegistrationForm } from "@/features/Login/Register/UserRegistrationForm"
import { CreateUserData, CreateUserError, CreateUserPayload, FormDataRegister,
  InputsPersonalInformation, InputsUserPassword, UserPasswordPayload } from "@/shared/types/Login.types"
import { Stepper } from "@/shared/ui/atoms/Stepper"
import { Header } from "@/shared/ui/organisms/Header"
import { ResultCard } from "@/features/Login/Register/ResultCard"
import { ERROR_CREATE_USER_MESSAGE, ERROR_CREATE_USER_TITLE, SUCCESS_CREATE_USER_MESSAGE, SUCCESS_CREATE_USER_TITLE } from "@/shared/constants/Login.constants"
import { AxiosResponse } from "axios"
import { GeneralError } from "@/shared/types/Global"
import { ERROR_EMAIL_IN_USE } from "@/shared/constants/Login.constants"
import { useAnimateBox } from "@/shared/hooks/useAnimateBox"


export default function RegisterPage() {
  const {
    direction, step, goPreviousView, goNextView, resetCounterView,
  } = useAnimateBox({ firstStep: 1, lastStepNumber: 3 });
  const {
      mutate: createUserMutation,
      isError,
      isPending,
      isSuccess,
      error
    } = useMutation<CreateUserData, AxiosResponse<CreateUserError>, CreateUserPayload>({
    mutationFn: createUserCb,
    onError: () => {
      goNextView()
    },
    onSuccess: () => {
      goNextView()
    }
  })

  const currentMessageError = (error as unknown as GeneralError)?.response?.data?.error?.message
  const messageError = currentMessageError === ERROR_EMAIL_IN_USE ? 'Intente con otro correo electrónico' : ERROR_CREATE_USER_MESSAGE

  const formData = useRef<FormDataRegister>({
    personalInformation: {
      firstName: "",
      middleName: "",
      lastName: ""
    },
    userPasswordInfo: {
      email: "",
      password: ""
    }
  })
  const steps = new Set(["Información Personal", "Usuario y contraseña", "Resultado"])

  const updatePersonalInformation = (data: InputsPersonalInformation) => {
    formData.current.personalInformation = data
  }
  const updateUserPassword = (data: InputsUserPassword) => {
    const payload: UserPasswordPayload = {
      email: data.email,
      password: data.password
    }
    formData.current.userPasswordInfo = payload
  }

  const handleSubmit = async () => {
    try {
      const payload: CreateUserPayload = {
        firstName: formData.current.personalInformation.firstName,
        middleName: formData.current.personalInformation.middleName ?? '',
        lastName: formData.current.personalInformation.lastName,
        email: formData.current.userPasswordInfo.email,
        password: formData.current.userPasswordInfo.password,
      }
      createUserMutation(payload)
    } catch (error) {
      console.log('error when registering user', error)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <Stepper steps={steps} currentStep={step} />
      <div className="flex-1 flex justify-center items-center">
        { step === 1 && (
          <PersonalInformation
            nextCb={goNextView}
            direction={direction}
            personalInformation={formData.current.personalInformation}
            updatePersonalInformation={updatePersonalInformation}
          />)}
        { step === 2 && (
          <UserRegistrationForm
            direction={direction}
            goBack={goPreviousView}
            updateUserPasswordInfo={updateUserPassword}
            submitForm={handleSubmit}
            isLoading={isPending}
          />) }
        { (step === 3 && isError) && (
          <ResultCard
            direction={direction}
            isError={isError}
            title={ERROR_CREATE_USER_TITLE}
            message={messageError}
            resetStep={resetCounterView}
          />)}
        { (step === 3 && isSuccess) && (
          <ResultCard
            direction={direction}
            isError={isError}
            title={SUCCESS_CREATE_USER_TITLE}
            message={SUCCESS_CREATE_USER_MESSAGE}
            resetStep={resetCounterView}
          />)}
      </div>
    </div>
  )
}