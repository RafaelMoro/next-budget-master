import { ReactNode } from "react"
import { useRouter } from 'next/navigation'

import { HomeIcon } from "../icons/HomeIcon"
import { CreditCardArrowIcon } from "../icons/CreditCardArrowIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"
import { DashboardAsideLink } from "../atoms/DashboardAsideLink"
import { DropdownSelectAccount } from "@/features/Accounts/DropdownSelectAccount"
import { AccountBank } from "@/shared/types/accounts.types"
import { LinkButton } from "../atoms/LinkButton"
import { DashboardScreens } from "@/shared/types/dashboard.types"
import { CREATE_RECORD_ROUTE } from "@/shared/constants/Global.constants"
import { getAccountCookie } from "@/shared/lib/preferences.lib"
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider"
import { saveAccountApi } from "@/shared/utils/user-info.utils"
import { Button } from "flowbite-react"

interface DashboardAsideProps {
  children: ReactNode;
  updateScreen: (newScreen: DashboardScreens) => void
  toggleSelectAccountModal: () => void
  accounts: AccountBank[];
  screen: DashboardScreens | null
}

export const DashboardAside = ({ children, accounts, updateScreen, toggleSelectAccountModal, screen }: DashboardAsideProps) => {
  const router = useRouter()
  const selectedAccountId = useDashboardStore(
      (state) => state.selectedAccount?._id
    )
  const handleCreateRecord = async () => {
    try {
      const selectedAccountCookie = await getAccountCookie()
      if (!selectedAccountCookie && selectedAccountId) {
        await saveAccountApi(selectedAccountId)
      }
      router.push(CREATE_RECORD_ROUTE)
    } catch (error) {
      console.error('Error creating record:', error)
    }
  }
  return (
    <aside className="w-72 p-5 flex flex-col gap-4 border-r border-r-gray-600">
      {children}
      { accounts.length > 0 && (
        <DropdownSelectAccount goAccounts={toggleSelectAccountModal} />
      )}
      <Button
        onClick={handleCreateRecord}
      >Registrar movimiento</Button>
      <nav className="mt-10 flex flex-col">
        <DashboardAsideLink isSelected={screen === 'overview'} onClickCb={() => updateScreen('overview')}>
            <HomeIcon />
            Panorama
        </DashboardAsideLink>
        <DashboardAsideLink isSelected={screen === 'accounts'} onClickCb={() => updateScreen('accounts')}>
            <CreditCardArrowIcon />
            Cuentas
        </DashboardAsideLink>
        <DashboardAsideLink isSelected={screen === 'transactions'} onClickCb={() => updateScreen('transactions')}>
            <AccountRecordsIcon />
            Transacciones
        </DashboardAsideLink>
      </nav>

      <section className="flex flex-col gap-2">
        <LinkButton type="darkRed" className="w-full" href="/api/auth/sign-out">Cerrar sesión</LinkButton>
      </section>
    </aside>
  )
}