import axios from "axios";
import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { parseSetCookie } from "@/shared/utils/parseCookie";

export async function POST(request: NextRequest) {
  const payload = await request.json()
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/`
  const res = await axios.post(uri, payload)
  const cookiesReceived = res.headers['set-cookie']
  if (cookiesReceived) {
    const [cookie] = cookiesReceived
    console.log('cookie', cookie)
    const cookieTransformed = parseSetCookie(cookie)
    console.log('cookieTransformed', cookieTransformed)
    const expire = cookieTransformed.attributes?.expires
    cookies().set(cookieTransformed.name, cookieTransformed.value, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 4,
      expires: typeof expire === 'string' ? new Date(expire) : new Date(),
      sameSite: 'lax',
    })
  }
  return new Response(JSON.stringify(res.data), {
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })

}