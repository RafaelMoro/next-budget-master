import { YupError } from "../types/Global"

export const handleErrorForm = (error: unknown): YupError => {
  const newError = error as YupError
  return newError
}