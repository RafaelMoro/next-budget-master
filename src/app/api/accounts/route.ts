import axios from "axios";
import { type NextRequest } from 'next/server'

import { getAccessToken } from "@/shared/lib/auth.lib";
import { GeneralError } from "@/shared/types/global.types";
import { EditAccountPayload } from "@/shared/types/accounts.types";

export async function PUT(request: NextRequest) {
  try {
    const accessToken = await getAccessToken()
    const payload: EditAccountPayload = await request.json()
    const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}/account-actions/`
    const res = await axios.put(uri, payload, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error updating account:', error);
    const message = (error as unknown as GeneralError)?.response?.data?.error?.message
    return new Response(JSON.stringify({ message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}