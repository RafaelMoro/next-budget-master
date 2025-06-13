"use server"
import { cookies } from 'next/headers'

export const getThemePreference = async () => {
  const theme = cookies().get('theme')?.value
  if (!theme) {
    return ''
  }
  return theme
}

export const saveThemeMode = (theme: string): void => {
  cookies().set('theme', theme, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}