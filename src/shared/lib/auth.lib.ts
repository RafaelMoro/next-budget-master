"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from 'next/headers'
import { COOKIE_SESSION_KEY } from "../constants/Global.constants";
import { deleteThemeCookie, removeAccountCookie, removeDashboardScreen, removeOverviewSubscreen } from "./preferences.lib";
import { GetAccessTokenResponse } from "../types/global.types";
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
    sameSite: 'strict',
  })
}

export const getAccessToken = async (): Promise<GetAccessTokenResponse> => {
  try {
    const secretKey = process.env.SESSION_SECRET_KEY!
    const session = cookies().get(COOKIE_SESSION_KEY)?.value
    if (!session) {
      return {
        message: 'Session not found',
        accessToken: null
      }
    }
  
    const encodedKey = new TextEncoder().encode(secretKey)
    const jwtDecoded = await jwtVerify(session, encodedKey)
    const accessToken = jwtDecoded?.payload?.accessToken as string
    return {
      message: null,
      accessToken
    }
  } catch (error) {
    if (error instanceof Error && error.message === JWT_ERROR_VERIFY) {
      return {
        message: 'Session invalid',
        accessToken: null
      }
    }
    return {
      message: 'Unknown error',
      accessToken: null
    }
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