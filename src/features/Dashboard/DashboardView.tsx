"use client"
import { toast, Toaster } from "sonner";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { AccountBank } from "@/shared/types/accounts.types"
import { HeaderMenuMobile } from "@/shared/ui/atoms/HeaderMenuMobile"
import { DashboardAside } from "@/shared/ui/organisms/DashboardAside"
import { HeaderDashboard } from "@/shared/ui/organisms/HeaderDashboard"
import { DetailedError } from "@/shared/types/global.types"
import { ERROR_CONNECTION, ERROR_CONNECTION_MESSAGE, GENERAL_ERROR_TITLE } from "@/shared/constants/Global.constants"
import { getAccountCookie } from "@/shared/lib/preferences.lib";
import { AccoountScreen } from "../Accounts/AccountScreen";

interface DashboardViewProps {
  accounts: AccountBank[];
  detailedError: DetailedError | null
}

/**
 * Component Description:
 * For mobile, the component renders the header and inside the drawer with the show accounts selector
 * For Desktop, the component shows the aside section along with the links and show accounts selector
 */
export const DashboardView = ({ accounts, detailedError }: DashboardViewProps) => {
  const { isMobile } = useMediaQuery()
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  useEffect(() => {
    getAccountCookie().then ((acc) => {
      if (acc) {
        setSelectedAccountId(acc);
      }
    })
  }, [])

  useEffect(() => {
    if (detailedError?.cause === ERROR_CONNECTION) {
      toast.error(ERROR_CONNECTION_MESSAGE);
    } else if (detailedError?.message) {
      toast.error(GENERAL_ERROR_TITLE);
    }
  }, [detailedError?.cause, detailedError?.message])

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
      <DashboardAside accounts={accounts}>
        <HeaderDashboard isMobile={isMobile} />
      </DashboardAside>
      <AccoountScreen accounts={accounts} />
      <Toaster position="top-center" />
    </div>
  )
}