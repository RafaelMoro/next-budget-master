import { saveOverviewSubscreen } from "@/shared/lib/preferences.lib"
import { ErrorCatched } from "@/shared/types/global.types"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const overviewSubscreen = payload?.overviewSubscreen
    if (!overviewSubscreen) {
      return new Response(JSON.stringify({ message: 'Overview subscreen is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    await saveOverviewSubscreen(overviewSubscreen)
    return new Response(JSON.stringify({ success: true, message: 'Overview subscreen saved' }), {
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