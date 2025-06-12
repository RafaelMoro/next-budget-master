"use client"
import Image from "next/image"
import { ToggleDarkMode } from "../atoms/ToggleDarkMode"
import { HeaderMenuMobile } from "../atoms/HeaderMenuMobile";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

export const HeaderDashboard = () => {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <header className="p-4 flex flex-row justify-between items-center">
        <Image className="rounded-full" src="/img/logo-no-bg.webp" alt="Budget Master Logo" width={70} height={70} />
        <HeaderMenuMobile />
      </header>
    )
  }

  return (
    <div className="flex justify-between items-center">
      <Image className="rounded-full" src="/img/logo-no-bg.webp" alt="Budget Master Logo" width={70} height={70} />
      <ToggleDarkMode />
    </div>
  )
}