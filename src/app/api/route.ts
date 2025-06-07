import axios from "axios";
import { type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const payload = await request.json()
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/`
  const res = await axios.post(uri, payload)
  const cookiesReceived = res.headers['set-cookie']

  if (cookiesReceived) {
    const [cookie] = cookiesReceived
    cookies().set('accessToken', cookie, {
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