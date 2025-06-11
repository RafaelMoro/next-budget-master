import { RiExpandUpDownLine } from "@remixicon/react"

interface ChangeAccountButtonProps {
  title: string;
  amount: string;
  type: string;
}

/**
 * This button component is shown in desktop in the aside bar of the dashboard
 */
export const ChangeAccoubntButton = ({ title, amount, type }: ChangeAccountButtonProps) => {
  return (
    <article
      className="flex justify-between w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900 focus:ring-2 focus:ring-indigo-200 focus:dark:ring-indigo-700/30 focus:border-indigo-500 focus:dark:border-indigo-700"
      >
      <div className="flex flex-col gap-2 items-start">
        <p className="text-sm">{title}</p>
        <p className="text-xs text-gray-400">{amount}</p>
        <span className="bg-blue-100 max-w-min text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
          {type}
        </span>
      </div>
      <RiExpandUpDownLine className="cursor-pointer" strokeWidth={1} />
    </article>
  )
}