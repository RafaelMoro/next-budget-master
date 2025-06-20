import { HomeIcon } from "../icons/HomeIcon"
import { CreditCardIcon } from "../icons/CreditCardIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"
import { ReactNode } from "react"
import { DashboardAsideLink } from "../atoms/DashboardAsideLink"
import { DropdownSelectAccount } from "@/features/Accounts/DropdownSelectAccount"
import { AccountBank } from "@/shared/types/accounts.types"
import { LinkButton } from "../atoms/LinkButton"
import { DashboardScreens } from "@/shared/types/dashboard.types"

interface DashboardAsideProps {
  children: ReactNode;
  updateScreen: (newScreen: DashboardScreens) => void
  accounts: AccountBank[];
}

export const DashboardAside = ({ children, accounts, updateScreen }: DashboardAsideProps) => {
  return (
    <aside className="w-72 p-5 flex flex-col gap-4 border-r border-r-gray-600">
      {children}
      { accounts.length > 0 && (
        <DropdownSelectAccount
          accounts={accounts}
        />
      )}
      <nav className="mt-10 flex flex-col">
        <DashboardAsideLink onClickCb={() => updateScreen('overview')}>
            <HomeIcon />
            Panorama
        </DashboardAsideLink>
        <DashboardAsideLink onClickCb={() => updateScreen('accounts')}>
            <CreditCardIcon />
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