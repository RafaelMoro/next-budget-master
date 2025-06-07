"use client"
import { useState, useRef } from "react"

import { Stepper } from "@/shared/ui/atoms/Stepper"
import { Header } from "@/shared/ui/organisms/Header"
import { PersonalInformation } from "@/features/Login/Register/PersonalInformation"
import { UserRegistrationForm } from "@/features/Login/Register/UserPasswordForm"
import { FormDataRegister, InputsPersonalInformation } from "@/shared/types/Login.types"

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const formData = useRef<FormDataRegister>({
    personalInformation: null
  })
  const steps = new Set(["Personal Information", "Set user and password"])
  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => prev - 1)

  const updatePersonalInformation = (data: InputsPersonalInformation) => {
    formData.current.personalInformation = data
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="flex-1 flex justify-center items-center">
        { currentStep === 1 && (<PersonalInformation nextCb={nextStep} updatePersonalInformation={updatePersonalInformation} />)}
        { currentStep === 2 && (<UserRegistrationForm goBack={prevStep} />) }
      </div>
    </div>
  )
}