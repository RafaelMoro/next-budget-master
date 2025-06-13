"use client"
import Image from "next/image"
import { ToggleDarkMode } from "../atoms/ToggleDarkMode"
import { ReactNode } from "react";
import { ThemeMode } from "@/shared/constants/Global.constants";

interface HeaderDashboardProps {
  theme: ThemeMode;
  isMobile: boolean;
  children?: ReactNode
}

export const HeaderDashboard = ({ theme, isMobile, children }: HeaderDashboardProps) => {
  if (isMobile) {
    return (
      <header className="p-4 flex flex-row justify-between items-center">
        <Image className="rounded-full" src="/img/logo-no-bg.webp" alt="Budget Master Logo" width={70} height={70} />
        { children }
      </header>
    )
  }

  return (
    <div className="flex justify-between items-center">
      <Image className="rounded-full" src="/img/logo-no-bg.webp" alt="Budget Master Logo" width={70} height={70} />
      <ToggleDarkMode theme={theme} />
    </div>
  )
}