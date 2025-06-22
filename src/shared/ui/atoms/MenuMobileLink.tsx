import Link from "next/link";
import { ReactNode } from "react";

interface MenuMobileLinkProps {
  href: string;
  children: ReactNode
}

export const MenuMobileLink = ({ children, href }: MenuMobileLinkProps) => {
  return (
    <Link
      href={href}
      className="flex gap-1 rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
      {children}
    </Link>
  )
}