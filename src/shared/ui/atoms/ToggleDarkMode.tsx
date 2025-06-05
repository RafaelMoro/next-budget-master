"use client"
import { Button } from "flowbite-react";
import { NightIcon } from "@/shared/ui/icons/Nights";

export function ToggleDarkMode() {
return (
  <Button color="dark" outline>
    <NightIcon />
  </Button>
)
}