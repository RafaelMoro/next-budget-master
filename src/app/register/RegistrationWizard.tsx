"use client"

import { PersonalInformation } from "@/features/Login/Register/PersonalInformation"
import { UserRegistrationForm } from "@/features/Login/Register/UserPasswordForm"
import { CreateUserData, CreateUserPayload, FormDataRegister, InputsPersonalInformation, InputsUserPassword, UserPasswordPayload } from "@/shared/types/Login.types"
import { Stepper } from "@/shared/ui/atoms/Stepper"
import { Header } from "@/shared/ui/organisms/Header"
import { useEffect, useRef, useState } from "react"

interface RegisterPageProps {
  submitForm: (data: CreateUserPayload) => Promise<CreateUserData>;
}

export const RegistrationWizard = ({ submitForm }: RegisterPageProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
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
      const res = await submitForm({
        firstName: formData.current.personalInformation.firstName,
        middleName: formData.current.personalInformation.middleName ?? '',
        lastName: formData.current.personalInformation.lastName,
        email: formData.current.userPasswordInfo.email,
        password: formData.current.userPasswordInfo.password,
      })
      console.log('res', res)
    } catch (error) {
      console.log('error when registering user', error)
    }
  }

  useEffect(() => {
    if (currentStep === 3) {
      handleSubmit()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep])

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
        { currentStep === 2 && (<UserRegistrationForm goBack={prevStep} updateUserPasswordInfo={updateUserPassword} goNext={nextStep} />) }
        { currentStep === 3 && (<p>Loading...</p>)}
      </div>
    </div>
  )
}