import { saveDashboardScreen } from "@/shared/lib/preferences.lib"
import { ErrorCatched } from "@/shared/types/global.types"
import { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const dashboardScreen = payload?.dashboardScreen
    if (!dashboardScreen) {
      return new Response(JSON.stringify({ message: 'Dashboard screen is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    await saveDashboardScreen(dashboardScreen)
    return new Response(JSON.stringify({ success: true, message: 'Dashboard screen saved' }), {
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