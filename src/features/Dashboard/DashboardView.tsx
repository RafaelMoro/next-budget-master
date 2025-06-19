"use client"
import { toast, Toaster } from "sonner";
import { useEffect } from "react";

import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { AccountBank } from "@/shared/types/accounts.types"
import { HeaderMenuMobile } from "@/shared/ui/atoms/HeaderMenuMobile"
import { DashboardAside } from "@/shared/ui/organisms/DashboardAside"
import { HeaderDashboard } from "@/shared/ui/organisms/HeaderDashboard"
import { AccountsView } from "../Accounts/AccountsView"
import { DetailedError } from "@/shared/types/global.types"
import { ERROR_CONNECTION, ERROR_CONNECTION_MESSAGE, GENERAL_ERROR_TITLE } from "@/shared/constants/Global.constants"
import { CreateAccButton } from "../Accounts/CreateAccButton";

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
    <div className="w-full min-h-screen max-w-screen-2xl flex">
      <DashboardAside accounts={accounts}>
        <HeaderDashboard isMobile={isMobile} />
      </DashboardAside>
      <main className="w-full pl-4 pt-4 min-w-xl mt-3 flex flex-col gap-4">
        <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3">Cuentas bancarias</h1>
        <div className="w-full flex justify-end">
          <CreateAccButton />
        </div>
        { accounts.length > 0  && (<p className="text-center text-xl">Haz click en cualquiera de tus cuentas para ver más en detalle la informacion</p>)}
        <AccountsView accounts={accounts} />
      </main>
      <Toaster position="top-center" />
    </div>
  )
}