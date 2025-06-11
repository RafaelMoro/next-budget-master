import Link from "next/link"
import { HomeIcon } from "../icons/HomeIcon"
import { CreditCardIcon } from "../icons/CreditCardIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"

export const DashboardAside = () => {
  return (
    <aside className="w-72 p-5 flex flex-col gap-4 border-r border-r-gray-600">
      <nav className="flex flex-col">
        <Link className="text-indigo-400 hover:text-white flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm transition hover:bg-gray-900  focus-visible:outline-2" href="/">
            <HomeIcon />
            Overview
        </Link>
        <Link className="text-indigo-400 hover:text-white flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm transition hover:bg-gray-900  focus-visible:outline-2" href="/">
            <CreditCardIcon />
            Accounts
        </Link>
        <Link className="text-indigo-400 hover:text-white flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm transition hover:bg-gray-900  focus-visible:outline-2" href="/">
            <AccountRecordsIcon />
            All records
        </Link>
      </nav>
    </aside>
  )
}