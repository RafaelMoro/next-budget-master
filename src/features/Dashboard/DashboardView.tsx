"use client"

import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { AccountBank } from "@/shared/types/accounts.types"
import { HeaderMenuMobile } from "@/shared/ui/atoms/HeaderMenuMobile"
import { DashboardAside } from "@/shared/ui/organisms/DashboardAside"
import { HeaderDashboard } from "@/shared/ui/organisms/HeaderDashboard"
import { Account } from "../Accounts/Accounts"
import { AccountsView } from "../Accounts/AccountsView"

interface DashboardViewProps {
  accounts: AccountBank[];
}

/**
 * Component Description:
 * For mobile, the component renders the header and inside the drawer with the show accounts selector
 * For Desktop, the component shows the aside section along with the links and show accounts selector
 */
export const DashboardView = ({ accounts }: DashboardViewProps) => {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <main className='mt-3 flex flex-col gap-4"'>
        <HeaderDashboard isMobile>
          <HeaderMenuMobile accounts={accounts} />
        </HeaderDashboard>
        <Account name="Santander" balance="$12,640.54" accountType="Credito" accountProvider="mastercard" />
        <Account name="HSBC oro" balance="$24,780.08" accountType="Credito" accountProvider="visa" />
        <Account name="Gold Elite" balance="$78,050.10" accountType="Credito" accountProvider="americanExpress" />
      </main>
    )
  }

  return (
    <div className="w-full min-h-screen max-w-screen-2xl flex">
      <DashboardAside accounts={accounts}>
        <HeaderDashboard isMobile={isMobile} />
      </DashboardAside>
      <main className='min-w-xl mt-3 flex flex-col gap-4"'>
        <h1 className="text-black dark:text-white text-4xl text-center font-bold col-span-3">Bienvenido de vuelta</h1>
        <AccountsView accounts={accounts} />
      </main>
    </div>
  )
}