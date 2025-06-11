import axios from "axios";
import { type NextRequest } from 'next/server'

import { getCookieProps } from "@/shared/utils/parseCookie";
import { encodeAccessToken, saveSessionCookie } from "@/shared/lib/auth.lib";
import { GeneralError } from "@/shared/types/global.types";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/`
    const res = await axios.post(uri, payload)
    const cookiesReceived = res.headers['set-cookie']

    if (cookiesReceived) {
      const [cookie] = cookiesReceived
      const { value: cookieValue } = getCookieProps(cookie)
      const session = await encodeAccessToken(cookieValue)
      saveSessionCookie(session)
      
      return new Response(JSON.stringify(res.data), {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    return new Response(JSON.stringify({ message: 'missing cookie' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    const message = (error as unknown as GeneralError)?.response?.data?.error?.message
    return new Response(JSON.stringify({ message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}