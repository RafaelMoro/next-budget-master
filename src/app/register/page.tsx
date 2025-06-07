"use client"
import { useState } from "react"

import { Stepper } from "@/shared/ui/atoms/Stepper"
import { Header } from "@/shared/ui/organisms/Header"
import { PersonalInformation } from "@/features/Login/Register/PersonalInformation"

export default function RegisterPage() {
  const steps = new Set(["Personal Information", "Set user and password"])
  const [currentStep, setCurrentStep] = useState<number>(1)
  const nextStep = () => setCurrentStep((prev) => prev + 1)
  const prevStep = () => setCurrentStep((prev) => prev - 1)

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="flex-1 flex justify-center items-center">
        { currentStep === 1 && (<PersonalInformation />)}
      </div>
    </div>
  )
}