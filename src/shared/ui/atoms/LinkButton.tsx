import Link from "next/link";

interface LinkButtonProps {
  href: string;
  text: string;
  isSecondary?: boolean
  className?: string
}

export const LinkButton = ({ href, text, className, isSecondary = false }: LinkButtonProps) => {
  const primaryButtonCSS = "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:cursor-pointer"
  const secondaryButtonCSs = "relative flex items-center justify-center rounded-lg text-center font-medium focus:outline-none focus:ring-4 h-10 px-5 text-sm border border-primary-700 text-primary-700 hover:border-primary-800 hover:bg-primary-800 hover:text-white focus:ring-primary-300 dark:border-primary-600 dark:text-primary-500 dark:hover:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white dark:focus:ring-primary-800"

  const butonCSS = isSecondary ? secondaryButtonCSs : primaryButtonCSS
  return (
    <Link
      className={`${butonCSS} ${className && className}`}
      href={href}
    >{text}</Link>
  )
}