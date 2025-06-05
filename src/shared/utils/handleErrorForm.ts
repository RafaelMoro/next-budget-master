import { FormError, ZodError } from "../types/Global"

export const handleErrorForm = (error: unknown): FormError => {
  const newError = error as ZodError
  const [currentError] = JSON.parse(newError?.message)
  const infoError = {
    message: currentError.message,
    path: currentError.path,
    code: currentError.code,
  }
  return infoError
}