"use client";
import { HomeIcon } from "../icons/HomeIcon"
import { CreditCardIcon } from "../icons/CreditCardIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"
import { ReactNode } from "react"
import { DashboardAsideLink } from "../atoms/DashboardAsideLink"
import { DASHBOARD_ROUTE } from "@/shared/constants/Global.constants"
import { ChangeAccoubntButton } from "@/features/Accounts/ChangeAccountButton"
import { DropdownSelectAccount } from "@/features/Accounts/DropdownSelectAccount"
import { RiExpandUpDownLine } from "@remixicon/react";

interface DashboardAsideProps {
  children: ReactNode;
}

export const DashboardAside = ({ children }: DashboardAsideProps) => {
  return (
    <aside className="w-72 p-5 flex flex-col gap-4 border-r border-r-gray-600">
      {children}
      <DropdownSelectAccount
        customElement={() => (
          <ChangeAccoubntButton
            title="American Express"
            amount="$1,000.00"
            type="Credito"
          />
        )}
      />
      <DropdownSelectAccount customElement={() => (
        <article className="flex justify-between w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900 focus:ring-2 focus:ring-indigo-200 focus:dark:ring-indigo-700/30 focus:border-indigo-500 focus:dark:border-indigo-700">
          <div className="flex flex-col gap-2 items-start">
            <p className="text-sm">American express</p>
            <p className="text-xs text-gray-400">$1,000.00</p>
            <span className="bg-blue-100 max-w-min text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
              Credit
            </span>
          </div>
          <RiExpandUpDownLine className="cursor-pointer" strokeWidth={1} />
        </article>
        )} />
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