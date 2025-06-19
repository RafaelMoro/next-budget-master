import axios from "axios"
import { NextApiRequest } from "next"

import { getAccessToken } from "@/shared/lib/auth.lib"
import { GeneralError } from "@/shared/types/global.types"
import { GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE } from "@/shared/constants/records.constants"

export async function GET(request: NextApiRequest) {
  try {
    const accessToken = await getAccessToken()
    const { accountId, month, year } = request.query
    const uri = `${process.env.NEXT_PUBLIC_BACKEND_URI}${GET_EXPENSES_AND_INCOMES_BY_MONTH_ROUTE}/${accountId}/${month}/${year}`
    const res = await axios.get(uri, {
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
    console.error('Error fetching records:', error);
    const message = (error as unknown as GeneralError)?.response?.data?.error?.message
    return new Response(JSON.stringify({ message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}