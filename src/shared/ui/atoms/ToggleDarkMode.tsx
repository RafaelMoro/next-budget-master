"use client"
import { useState } from "react";
import { Button } from "flowbite-react";
import { NightIcon } from "@/shared/ui/icons/Nights";
import { ThemeMode } from "@/shared/constants/Global.constants";

interface ToggleDarkModeProps {
  cssClass?: string;
}

export const ToggleDarkMode = ({ cssClass }: ToggleDarkModeProps) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;

    if (mode === 'light') {
      setMode('dark')
      htmlElement.setAttribute("data-theme", "dark");
      return
    }
    setMode('light')
    htmlElement.setAttribute("data-theme", "light");
  }

  return (
    <Button className={cssClass && cssClass} data-testid="toggle-theme-mode-button" onClick={toggleDarkMode} color="dark" outline>
      <NightIcon />
    </Button>
  )
}