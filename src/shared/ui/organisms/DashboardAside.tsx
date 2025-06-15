import { HomeIcon } from "../icons/HomeIcon"
import { CreditCardIcon } from "../icons/CreditCardIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"
import { ReactNode } from "react"
import { DashboardAsideLink } from "../atoms/DashboardAsideLink"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { DropdownSelectAccount } from "@/features/Accounts/DropdownSelectAccount"
import { AccountBank } from "@/shared/types/accounts.types"
import { LinkButton } from "../atoms/LinkButton"

interface DashboardAsideProps {
  children: ReactNode;
  accounts: AccountBank[];
}

export const DashboardAside = ({ children, accounts }: DashboardAsideProps) => {
  return (
    <aside className="w-72 p-5 flex flex-col gap-4 border-r border-r-gray-600">
      {children}
      { accounts.length > 0 && (
        <DropdownSelectAccount
          accounts={accounts}
        />
      )}
      <nav className="mt-10 flex flex-col">
        <DashboardAsideLink href={DASHBOARD_ROUTE}>
            <HomeIcon />
            Panorama
        </DashboardAsideLink>
        <DashboardAsideLink href={DASHBOARD_ROUTE}>
            <CreditCardIcon />
            Cuentas
        </DashboardAsideLink>
        <DashboardAsideLink href={DASHBOARD_ROUTE}>
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