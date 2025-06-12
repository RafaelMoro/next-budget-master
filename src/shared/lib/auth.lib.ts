"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from 'next/headers'
import { COOKIE_SESSION_KEY } from "../constants/Global.constants";

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

export const saveSessionCookie = (session: string): void => {
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
}

export const getAccessToken = async () => {
  const secretKey = process.env.SESSION_SECRET_KEY!
  const session = cookies().get(COOKIE_SESSION_KEY)?.value
  if (!session) {
    return ''
  }

  const encodedKey = new TextEncoder().encode(secretKey)
  const jwtDecoded = await jwtVerify(session, encodedKey)
  const accessToken = jwtDecoded?.payload?.accessToken as string
  return accessToken
}

export const deleteSession = async () => {
  await cookies().delete(COOKIE_SESSION_KEY)
}