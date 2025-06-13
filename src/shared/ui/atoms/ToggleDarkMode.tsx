"use client"
import { useState } from "react";
import { Button } from "flowbite-react";
import { NightIcon } from "@/shared/ui/icons/Nights";
import { ThemeMode } from "@/shared/constants/Global.constants";

interface ToggleDarkModeProps {
  theme: ThemeMode;
  cssClass?: string;
}

export const ToggleDarkMode = ({ cssClass, theme }: ToggleDarkModeProps) => {
  const [mode, setMode] = useState<ThemeMode>(theme);

  const toggleDarkMode = async () => {
    const htmlElement = document.documentElement;

    if (mode === 'light') {
      setMode('dark')
      await fetch('/api/preferences/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: 'dark' }),
      })
      htmlElement.setAttribute("data-theme", "dark");
      return
    }

    setMode('light')
    await fetch('/api/preferences/theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme: 'light' }),
    })
    htmlElement.setAttribute("data-theme", "light");
  }

  return (
    <Button className={cssClass && cssClass} data-testid="toggle-theme-mode-button" onClick={toggleDarkMode} color="dark" outline>
      <NightIcon />
    </Button>
  )
}