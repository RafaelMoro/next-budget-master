"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from 'next/headers'
import { COOKIE_SESSION_KEY } from "../constants/Global.constants";
import { deleteThemeCookie, removeAccountCookie, removeDashboardScreen, removeOverviewSubscreen } from "./preferences.lib";
import { JWT_ERROR_VERIFY } from "../constants/Login.constants";

export const encodeAccessToken = async (cookieValue: string): Promise<string> => {
  const secretKey = process.env.SESSION_SECRET_KEY!
  const encodedKey = new TextEncoder().encode(secretKey)
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const session = await new SignJWT({ accessToken: cookieValue })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiredAt)
    .sign(encodedKey)
  return session
}

export const saveSessionCookie = async (session: string): Promise<void> => {
  await cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 5 // 5 days
  })
}

export const getAccessToken = async () => {
  try {
    const secretKey = process.env.SESSION_SECRET_KEY!
    const session = cookies().get(COOKIE_SESSION_KEY)?.value
    if (!session) {
      return ''
    }
  
    const encodedKey = new TextEncoder().encode(secretKey)
    const jwtDecoded = await jwtVerify(session, encodedKey)
    const accessToken = jwtDecoded?.payload?.accessToken as string
    return accessToken
  } catch (error) {
    if (error instanceof Error && error.message === JWT_ERROR_VERIFY) {
      return ''
    }
    return ''
  }
}

export const deleteSession = async () => {
  await cookies().delete(COOKIE_SESSION_KEY)
}

export const signOut = async () => {
  await deleteSession()
  await removeAccountCookie()
  await removeOverviewSubscreen()
  await removeDashboardScreen()
  await deleteThemeCookie()
}