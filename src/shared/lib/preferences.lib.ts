"use server"
import { cookies } from 'next/headers'
import { ThemeMode } from '../constants/Global.constants'

/**
 * This function gets the value of the theme in the cookie. It sets the cookie if it doesn't exist
 * @returns string. If not found, return default 'dark'
 */
export const getThemePreference = async () => {
  const cookieStore = cookies()
  const theme = await cookieStore.get('theme')?.value
  if (!theme) {
    // Return default
    return 'dark'
  }
  return theme
}

/**
 * This function saves the theme in the cookie
 * @param theme - The theme mode to save
 * @returns Promise<void>
 */
export const saveThemeCookie = async (theme: ThemeMode): Promise<void> => {
  await cookies().set('theme', theme, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}