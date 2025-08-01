import clsx from "clsx"

interface ChartLineIconProps {
  className?: string
}

export const ChartLineIcon = ({ className }: ChartLineIconProps) => {
  const iconCssClass = clsx(
    "icon icon-tabler icons-tabler-outline icon-tabler-chart-line",
    className
  )
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconCssClass}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19l16 0" /><path d="M4 15l4 -6l4 2l4 -5l4 4" /></svg>
  )
}