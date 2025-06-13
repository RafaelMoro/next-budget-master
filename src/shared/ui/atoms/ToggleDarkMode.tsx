"use client"
import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { NightIcon } from "@/shared/ui/icons/Nights";
import { ThemeMode } from "@/shared/constants/Global.constants";
import { addToLocalStorage, getLocalStorageInfo } from "@/shared/lib/local-storage.lib";

interface ToggleDarkModeProps {
  cssClass?: string;
}

export const ToggleDarkMode = ({ cssClass }: ToggleDarkModeProps) => {
  const [mode, setMode] = useState<ThemeMode>('dark');

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;

    if (mode === 'light') {
      setMode('dark')
      addToLocalStorage({ newInfo: { preferences: { themeMode: 'dark' } } })
      htmlElement.setAttribute("data-theme", "dark");
      return
    }

    setMode('light')
    addToLocalStorage({ newInfo: { preferences: { themeMode: 'light' } } })
    htmlElement.setAttribute("data-theme", "light");
  }

  useEffect(() => {
    try {
      const localStorageInfo = getLocalStorageInfo()
      // Means the local storage is empty
      if (Object.keys(localStorageInfo).length === 0) {
        return
      }

      const { preferences: { themeMode } } = localStorageInfo
      setMode(themeMode)
    } catch (error) {
      console.log('error getting local storage', error)
    }
  }, [])

  return (
    <Button className={cssClass && cssClass} data-testid="toggle-theme-mode-button" onClick={toggleDarkMode} color="dark" outline>
      <NightIcon />
    </Button>
  )
}