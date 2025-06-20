"use client"

import { ReactNode, useRef, useContext  } from "react"
import { createDashboardStore, DashboardStoreApi, DashboardStoreContext, type DashboardStore } from "../store/dashboard.store"
import { useStore } from "zustand"

interface DashboardStoreProviderProps {
  children: ReactNode
}

export const DashboardStoreProvider = ({ children }: DashboardStoreProviderProps) => {
  const storeRef = useRef<DashboardStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createDashboardStore()
  }

  return (
    <DashboardStoreContext.Provider value={storeRef.current}>
      {children}
    </DashboardStoreContext.Provider>
  )
}

export const useDashboardStore = <T,>(
  selector: (store: DashboardStore) => T,
): T => {
  const dashboardStoreContext = useContext(DashboardStoreContext)

  if (!dashboardStoreContext) {
    throw new Error(`useDashboardStore must be used within DashboardStoreContext`)
  }

  return useStore(dashboardStoreContext, selector)
}