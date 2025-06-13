import { saveThemeCookie } from "@/shared/lib/preferences.lib"
import { ErrorCatched } from "@/shared/types/global.types"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const theme = payload?.theme
    if (!theme) {
      return new Response(JSON.stringify({ message: 'Theme is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    await saveThemeCookie(theme)
    return new Response(JSON.stringify({ success: true, themeChangedTo: theme }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      })
  } catch (error: unknown) {
    const currentError = error as ErrorCatched
    return new Response(JSON.stringify({ message: currentError?.message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}