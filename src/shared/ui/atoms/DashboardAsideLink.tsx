import Link from "next/link"
import { ReactNode } from "react";

interface DashboardAsideLinkProps {
  href: string;
  children: ReactNode
}

export const DashboardAsideLink = ({ href, children }: DashboardAsideLinkProps) => {
  return (
    <Link href={href} className="text-gray-400 hover:text-indigo-400 flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm transition hover:bg-gray-900  focus-visible:outline-2">
      {children}
    </Link>
  )
}