import Link from "next/link"
import { HomeIcon } from "../icons/HomeIcon"
import { CreditCardIcon } from "../icons/CreditCardIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"
import { ReactNode } from "react"
import { DashboardAsideLink } from "../atoms/DashboardAsideLink"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"

interface DashboardAsideProps {
  children: ReactNode;
}

export const DashboardAside = ({ children }: DashboardAsideProps) => {
  return (
    <aside className="w-72 p-5 flex flex-col gap-4 border-r border-r-gray-600">
      {children}
      <nav className="flex flex-col">
        <DashboardAsideLink href={DASHBOARD_ROUTE}>
            <HomeIcon />
            Overview
        </DashboardAsideLink>
        <DashboardAsideLink href={DASHBOARD_ROUTE}>
            <CreditCardIcon />
            Accounts
        </DashboardAsideLink>
        <DashboardAsideLink href={DASHBOARD_ROUTE}>
            <AccountRecordsIcon />
            All records
        </DashboardAsideLink>
      </nav>
    </aside>
  )
}