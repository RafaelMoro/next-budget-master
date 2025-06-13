"use client"
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { NightIcon } from "@/shared/ui/icons/Nights";
import { ThemeMode } from "@/shared/constants/Global.constants";
import { getThemePreference } from "@/shared/lib/preferences.lib";
import { saveThemeApi } from "@/shared/utils/preferences.utils";

interface ToggleDarkModeProps {
  cssClass?: string;
}

export const ToggleDarkMode = ({ cssClass }: ToggleDarkModeProps) => {
  const [mode, setMode] = useState<ThemeMode | null>(null);
  

  const toggleDarkMode = async () => {
    const htmlElement = document.documentElement;

    if (mode === 'light') {
      setMode('dark')
      await saveThemeApi('dark')
      htmlElement.setAttribute("data-theme", "dark");
      return
    }

    setMode('light')
    await saveThemeApi('light')
    htmlElement.setAttribute("data-theme", "light");
  }

  useEffect(() => {
    getThemePreference().then((theme) => setMode(theme as ThemeMode))
  }, [])

  return (
    <Button className={cssClass && cssClass} data-testid="toggle-theme-mode-button" onClick={toggleDarkMode} color="dark" outline>
      <NightIcon />
    </Button>
  )
}