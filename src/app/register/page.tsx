"use client"
import { useState } from "react"

import { Stepper } from "@/shared/ui/atoms/Stepper"
import { Header } from "@/shared/ui/organisms/Header"

export default function RegisterPage() {
  const steps = new Set(["Personal Information", "Set user and password"])
  const [currentStep, setCurrentStep] = useState<number>(1)
  return (
    <div>
      <Header />
      <Stepper steps={steps} currentStep={currentStep} />
    </div>
  )
}