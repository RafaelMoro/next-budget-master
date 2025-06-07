import axios from "axios";
import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { SignJWT } from "jose";
import { getCookieProps } from "@/shared/utils/parseCookie";

export async function POST(request: NextRequest) {
  const payload = await request.json()
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/`
  const res = await axios.post(uri, payload)
  const cookiesReceived = res.headers['set-cookie']

  if (cookiesReceived) {
    const [cookie] = cookiesReceived
    const { value: cookieValue } = getCookieProps(cookie)

    const secretKey = process.env.SESSION_SECRET_KEY!
    const encodedKey = new TextEncoder().encode(secretKey)
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    const session = await new SignJWT({ cookieValue })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(expiredAt)
      .sign(encodedKey)
    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })
  }
  return new Response(JSON.stringify(res.data), {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })

}