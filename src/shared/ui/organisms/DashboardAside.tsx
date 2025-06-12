import { HomeIcon } from "../icons/HomeIcon"
import { CreditCardIcon } from "../icons/CreditCardIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"
import { ReactNode } from "react"
import { DashboardAsideLink } from "../atoms/DashboardAsideLink"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { DropdownSelectAccount } from "@/features/Accounts/DropdownSelectAccount"
import { AccountBank } from "@/shared/types/accounts.types"

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
      <nav className="flex flex-col mt-10">
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
    </aside>
  )
}