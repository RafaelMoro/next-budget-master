import { saveAccountCookie } from "@/shared/lib/preferences.lib"
import { ErrorCatched } from "@/shared/types/global.types"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const accountId = payload?.accountId
    if (!accountId) {
      return new Response(JSON.stringify({ message: 'Account Id is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    await saveAccountCookie(accountId)
    return new Response(JSON.stringify({ success: true, message: 'Selected account saved' }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      })
  } catch (error: unknown) {
    const currentError = error as ErrorCatched
    return new Response(JSON.stringify({ success: false, message: currentError?.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}