"use client"
import { useDashboardStore } from '@/zustand/provider/dashboard-store-provider'
import { useRouter } from 'next/navigation'
import { getAccountCookie } from '../lib/preferences.lib'
import { saveAccountApi, saveSelectedAccountLocalStorage } from '../utils/user-info.utils'
import { CREATE_RECORD_ROUTE } from '../constants/Global.constants'

export const useDashboard = () => {
  const router = useRouter()
  const selectedAccountId = useDashboardStore(
    (state) => state.selectedAccount?._id
  )
  const selectedAccountDisplay = useDashboardStore(
    state => state.selectedAccountDisplay
  )
  const accountsDisplay = useDashboardStore(
    (state) => state.accountsDisplay
  )

  // Function that checks if the select cookie exists and set it if not,
  // This way we avoid on having null selected account in create record on first log in
  const manageSelectedAccountCookie = async () => {
    try {
      const selectedAccountCookie = await getAccountCookie()
      if (!selectedAccountCookie && selectedAccountId && selectedAccountDisplay) {
        await saveAccountApi(selectedAccountId)
        saveSelectedAccountLocalStorage({
          accountId: selectedAccountDisplay.accountId,
          accountType: selectedAccountDisplay.type
        })
      }
    } catch (error) {
      console.error('Error managing selected account cookie:', error)
    }
  }

  const handleGoCreateRecordRoute = async () => {
    try {
      await manageSelectedAccountCookie()
      router.push(CREATE_RECORD_ROUTE)
    } catch (error) {
      console.error('Error redirecting create record:', error)
    }
  }

  return {
    handleGoCreateRecordRoute,
    manageSelectedAccountCookie,
    accountsDisplay,
  }
}