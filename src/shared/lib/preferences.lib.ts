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

/**
 * This function calls the API to save the theme in the cookie for client side components
 * @param theme - The theme mode to save
 * @returns Promise<void>
 */
export const saveThemeApi = async (theme: ThemeMode) => {
  try {
    const res = await fetch('/api/preferences/theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme }),
    })
    return res
  } catch (error) {
    console.log('error while saving theme in api', error)
  }
}