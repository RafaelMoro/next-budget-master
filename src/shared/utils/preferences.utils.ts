"use client"

import { ThemeMode } from "../constants/Global.constants"

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