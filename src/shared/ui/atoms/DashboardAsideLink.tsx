import { ReactNode } from "react";

interface DashboardAsideLinkProps {
  onClickCb: () => void;
  children: ReactNode
}

export const DashboardAsideLink = ({ onClickCb, children }: DashboardAsideLinkProps) => {
  return (
    <button onClick={onClickCb} className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm transition hover:bg-gray-200 dark:hover:bg-gray-900  focus-visible:outline-2">
      {children}
    </button>
  )
}