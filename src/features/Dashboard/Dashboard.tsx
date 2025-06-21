"use client"
import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { HeaderMenuMobile } from "@/shared/ui/atoms/HeaderMenuMobile"
import { DashboardAside } from "@/shared/ui/organisms/DashboardAside"
import { HeaderDashboard } from "@/shared/ui/organisms/HeaderDashboard"
import { DetailedError } from "@/shared/types/global.types"
import { ERROR_CONNECTION, ERROR_CONNECTION_MESSAGE, GENERAL_ERROR_TITLE } from "@/shared/constants/Global.constants"
import { AccountScreen } from "./Account/AccountScreen";
import { DashboardScreens } from "@/shared/types/dashboard.types";
import { OverviewScreen } from "./Overview/OverviewScreen";
import { NoAccountsFoundScreen } from "../Accounts/NoAccountsFoundScreen";
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider";
import { AccountBank } from "@/shared/types/accounts.types";

interface DashboardViewProps {
  accountsFetched: AccountBank[]
  detailedError: DetailedError | null
  message: string | null;
}

/**
 * Component Description:
 * For mobile, the component renders the header and inside the drawer with the show accounts selector
 * For Desktop, the component shows the aside section along with the links and show accounts selector
 */
export const Dashboard = ({ detailedError, message, accountsFetched }: DashboardViewProps) => {
  const { isMobile } = useMediaQuery()
  const { accounts, updateAccounts, updateSelectedAccount } = useDashboardStore(
  (state) => state
  )
  const [screen, setScreen] = useState<DashboardScreens>('overview')

  const updateScreen = (newScreen: DashboardScreens) => setScreen(newScreen)

  useEffect(() => {
    if (detailedError?.cause === ERROR_CONNECTION) {
      toast.error(ERROR_CONNECTION_MESSAGE);
    } else if (detailedError?.message) {
      toast.error(GENERAL_ERROR_TITLE);
    }
  }, [detailedError?.cause, detailedError?.message])

  useEffect(() => {
    if (accounts.length !== accountsFetched.length) {
      const [firstAccount = null] = accountsFetched;
      if (firstAccount) {
        updateSelectedAccount(firstAccount)
      }
    }
    updateAccounts(accountsFetched)
  }, [accountsFetched])

  if (isMobile) {
    return (
      <main className='mt-3 flex flex-col gap-4"'>
        <HeaderDashboard isMobile>
          <HeaderMenuMobile accounts={accounts} />
        </HeaderDashboard>
        <Toaster position="top-center" />
      </main>
    )
  }

  return (
    <div className="w-full min-h-screen max-w-screen-2xl flex mx-auto my-0">
      <DashboardAside updateScreen={updateScreen} accounts={accounts}>
        <HeaderDashboard isMobile={isMobile} />
      </DashboardAside>
      { accounts.length === 0 && (
        <NoAccountsFoundScreen screen={screen} />
      )}
      { (screen === 'overview' && accounts.length > 0 ) && (<OverviewScreen message={message} />) }
      { (screen === 'accounts' && accounts.length > 0 ) && (<AccountScreen />) }
      <Toaster position="top-center" />
    </div>
  )
}