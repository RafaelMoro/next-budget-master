"use client"
import { useRouter } from 'next/navigation'
import { useMutation } from "@tanstack/react-query"
import { useRef, useState } from "react"

import { createUserCb } from "@/features/Login/Login/LoginCard.utils"
import { PersonalInformation } from "@/features/Login/Register/PersonalInformation"
import { UserRegistrationForm } from "@/features/Login/Register/UserRegistrationForm"
import { LOGIN_ROUTE } from "@/shared/constants/Global.constants"
import { CreateUserData, CreateUserError, CreateUserPayload, FormDataRegister,
  InputsPersonalInformation, InputsUserPassword, UserPasswordPayload } from "@/shared/types/Login.types"
import { Stepper } from "@/shared/ui/atoms/Stepper"
import { Header } from "@/shared/ui/organisms/Header"


export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<number>(1)
  const {
      mutate: createUserMutation,
      isError,
      isPending,
      isSuccess,
      isIdle,
      error
    } = useMutation<CreateUserData, CreateUserError, CreateUserPayload>({
    mutationFn: createUserCb,
    onSuccess: () => {
      setTimeout(() => {
        router.push(LOGIN_ROUTE)
      }, 2000)
    }
  })

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
  const steps = new Set(["Personal Information", "Set user and password"])
  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => prev - 1)

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
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="flex-1 flex justify-center items-center">
        { currentStep === 1 && (
          <PersonalInformation
            nextCb={nextStep}
            personalInformation={formData.current.personalInformation}
            updatePersonalInformation={updatePersonalInformation}
          />)}
        { currentStep === 2 && (
          <UserRegistrationForm
            goBack={prevStep}
            updateUserPasswordInfo={updateUserPassword}
            submitForm={handleSubmit}
            isLoading={isPending}
          />) }
        { currentStep === 3 && (<p>Loading...</p>)}
      </div>
    </div>
  )
}