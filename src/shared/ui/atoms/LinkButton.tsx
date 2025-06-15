import Link from "next/link";

interface LinkButtonProps {
  href: string;
  text: string;
  type?: 'primary' | 'secondary' | 'darkRed'
  isSecondary?: boolean
  className?: string
}

export const LinkButton = ({ href, text, className, type = 'primary' }: LinkButtonProps) => {
  const primaryButtonCSS = "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:cursor-pointer"
  const secondaryButtonCSs = "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm border border-primary-700 text-primary-700 hover:border-primary-800 hover:bg-primary-800 hover:text-white focus:ring-primary-300 dark:border-primary-600 dark:text-primary-500 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white dark:focus:ring-primary-800"
  const darkRedButtonCSS = "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm border border-red-700 text-red-700 hover:border-red-800 hover:bg-red-800 hover:text-white focus:ring-red-300 dark:border-red-600 dark:text-red-500 dark:hover:border-red-700 dark:hover:bg-red-700 dark:hover:text-white dark:focus:ring-red-800"

  const cssDic = {
    primary: primaryButtonCSS,
    secondary: secondaryButtonCSs,
    darkRed: darkRedButtonCSS
  }

  return (
    <Link
      className={`${cssDic[type]} ${className && className}`}
      href={href}
    >{text}</Link>
  )
}