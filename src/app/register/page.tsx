import { createUser } from "@/shared/lib/login"
import { RegistrationWizard } from "./RegistrationWizard"

export default function RegisterPage() {
  return (
    <RegistrationWizard submitForm={createUser} />
  )
}