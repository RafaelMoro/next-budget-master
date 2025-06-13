"use server"
import { cookies } from 'next/headers'

export const getThemePreference = async () => {
  const theme = cookies().get('theme')?.value
  if (!theme) {
    return ''
  }
  return theme
}

export const saveThemeMode = async (theme: string): Promise<void> => {
  await cookies().set('theme', theme, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}