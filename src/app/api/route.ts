import axios from "axios";
import { type NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { parseSetCookie } from "@/shared/utils/parseCookie";

export async function POST(request: NextRequest) {
  const payload = await request.json()
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/`
  const res = await axios.post(uri, payload)
  const cookiesReceived = res.headers['set-cookie']
  if (cookiesReceived) {
    const [cookie] = cookiesReceived
    const cookieTransformed = parseSetCookie(cookie)
    console.log('cookie', {cookieTransformed})
  }
  return new Response('Logged in', {
    status: 201
  })

}