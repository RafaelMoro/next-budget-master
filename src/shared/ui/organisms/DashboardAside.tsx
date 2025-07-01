import { ReactNode } from "react"
import Link from "next/link"

import { HomeIcon } from "../icons/HomeIcon"
import { CreditCardArrowIcon } from "../icons/CreditCardArrowIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"
import { DashboardAsideLink } from "../atoms/DashboardAsideLink"
import { DropdownSelectAccount } from "@/features/Accounts/DropdownSelectAccount"
import { AccountBank } from "@/shared/types/accounts.types"
import { LinkButton } from "../atoms/LinkButton"
import { DashboardScreens } from "@/shared/types/dashboard.types"
import { CREATE_RECORD_ROUTE } from "@/shared/constants/Global.constants"

interface DashboardAsideProps {
  children: ReactNode;
  updateScreen: (newScreen: DashboardScreens) => void
  toggleSelectAccountModal: () => void
  accounts: AccountBank[];
}

export const DashboardAside = ({ children, accounts, updateScreen, toggleSelectAccountModal }: DashboardAsideProps) => {

  return (
    <aside className="w-72 p-5 flex flex-col gap-4 border-r border-r-gray-600">
      {children}
      { accounts.length > 0 && (
        <DropdownSelectAccount goAccounts={toggleSelectAccountModal} />
      )}
      <Link
        href={CREATE_RECORD_ROUTE}
        className="relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >Crear movimiento</Link>
      <nav className="mt-10 flex flex-col">
        <DashboardAsideLink onClickCb={() => updateScreen('overview')}>
            <HomeIcon />
            Panorama
        </DashboardAsideLink>
        <DashboardAsideLink onClickCb={() => updateScreen('accounts')}>
            <CreditCardArrowIcon />
            Cuentas
        </DashboardAsideLink>
        <DashboardAsideLink onClickCb={() => updateScreen('transactions')}>
            <AccountRecordsIcon />
            Transacciones
        </DashboardAsideLink>
      </nav>

      <section className="flex flex-col gap-2">
        <LinkButton text="Cerrar sesión" type="darkRed" className="w-full" href="/api/auth/sign-out" />
      </section>
    </aside>
  )
}