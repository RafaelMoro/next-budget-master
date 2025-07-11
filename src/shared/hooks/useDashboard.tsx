"use client"
import { useDashboardStore } from '@/zustand/provider/dashboard-store-provider'
import { useRouter } from 'next/navigation'
import { getAccountCookie } from '../lib/preferences.lib'
import { saveAccountApi } from '../utils/user-info.utils'
import { CREATE_RECORD_ROUTE } from '../constants/Global.constants'

export const useDashboard = () => {
  const router = useRouter()
  const selectedAccountId = useDashboardStore(
    (state) => state.selectedAccount?._id
  )

  // Function that checks if the select cookie exists and set it if not, then redirect to create record route.
  // This way we avoid on having null selected account in create record on first log in
  const handleGoCreateRecordRoute = async () => {
    try {
      const selectedAccountCookie = await getAccountCookie()
      if (!selectedAccountCookie && selectedAccountId) {
        await saveAccountApi(selectedAccountId)
      }
      router.push(CREATE_RECORD_ROUTE)
    } catch (error) {
      console.error('Error redirecting create record:', error)
    }
  }

  return {
    handleGoCreateRecordRoute
  }
}