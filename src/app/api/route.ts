import axios from "axios";
import { type NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const payload = await request.json()
  const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/`
  const res = await axios.post(uri, payload)
  const cookiesReceived = res.headers['set-cookie']
  if (cookiesReceived) {
    const [cookie] = cookiesReceived
  }
  return new Response('Logged in', {
    status: 201
  })

}