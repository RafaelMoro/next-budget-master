import { ReactNode } from "react";

interface MenuMobileLinkProps {
  onClickCb: () => void;
  children: ReactNode
}

export const MenuMobileLink = ({ children, onClickCb }: MenuMobileLinkProps) => {
  return (
    <button
      onClick={onClickCb}
      className="flex gap-1 rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
      {children}
    </button>
  )
}