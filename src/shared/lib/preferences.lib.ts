"use server"
import { cookies } from 'next/headers'
import { ACCOUNT_COOKIE_KEY, DASHBOARD_SCREEN_KEY, OVERVIEW_SUBSCREEN_KEY, THEME_COOKIE_KEY, ThemeMode } from '../constants/Global.constants'

/**
 * This function gets the value of the theme in the cookie. It sets the cookie if it doesn't exist
 * @returns string. If not found, return default 'dark'
 */
export const getThemePreference = async () => {
  const cookieStore = cookies()
  const theme = await cookieStore.get(THEME_COOKIE_KEY)?.value
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
  await cookies().set(THEME_COOKIE_KEY, theme, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}

export const deleteThemeCookie = async () => {
  await cookies().delete(THEME_COOKIE_KEY)
}

/**
 * This function saves the selected account into the cookie
 * @param theme - The theme mode to save
 * @returns Promise<void>
 */
export const saveAccountCookie = async (accountId: string): Promise<void> => {
  await cookies().set(ACCOUNT_COOKIE_KEY, accountId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}

export const removeAccountCookie = async () => {
  await cookies().delete(ACCOUNT_COOKIE_KEY)
}

/**
 * This function gets the value of the account in the cookie.
 * @returns string or null if not found
 */
export const getAccountCookie = async () => {
  const cookieStore = cookies()
  const account = await cookieStore.get(ACCOUNT_COOKIE_KEY)?.value
  if (!account) {
    // Return default
    return null
  }
  return account
}

/**
 * This function saves the overview subscreen selection into the cookie
 * @param theme - The overview subscreen
 * @returns Promise<void>
 */
export const saveOverviewSubscreen = async (overviewSubscreen: string): Promise<void> => {
  await cookies().set(OVERVIEW_SUBSCREEN_KEY, overviewSubscreen, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}
export const removeOverviewSubscreen = async () => {
  await cookies().delete(OVERVIEW_SUBSCREEN_KEY)
}
/**
 * This function gets the value of the overview subscreen in the cookie.
 * @returns string or null if not found
 */
export const getOverviewSubscreen = async () => {
  const cookieStore = cookies()
  const overviewSubscreen = await cookieStore.get(OVERVIEW_SUBSCREEN_KEY)?.value
  if (!overviewSubscreen) {
    // Return default
    return null
  }
  return overviewSubscreen
}

/**
 * This function saves the dashboard subscreen selection into the cookie
 * @param dashboardScreen - The dashboard subscreen
 * @returns Promise<void>
 */
export const saveDashboardScreen = async (dashboardScreen: string): Promise<void> => {
  await cookies().set(DASHBOARD_SCREEN_KEY, dashboardScreen, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}
export const removeDashboardScreen = async () => {
  await cookies().delete(DASHBOARD_SCREEN_KEY)
}
/**
 * This function gets the value of the dashboard screen in the cookie.
 * @returns string or null if not found
 */
export const getDashboardScreen = async () => {
  const cookieStore = cookies()
  const dashboardScreen = await cookieStore.get(DASHBOARD_SCREEN_KEY)?.value
  if (!dashboardScreen) {
    // Return default
    return null
  }
  return dashboardScreen
}