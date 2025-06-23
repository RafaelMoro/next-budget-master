"use client"

import { Button, Drawer, DrawerHeader, DrawerItems, Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react"
import { RiMenuLine } from "@remixicon/react"
import { useState } from "react"
import { HomeIcon } from "../icons/HomeIcon"
import { AccountBank } from "@/shared/types/accounts.types"
import { DropdownSelectAccount } from "@/features/Accounts/DropdownSelectAccount"
import { MenuMobileLink } from "./MenuMobileLink"
import { CreditCardArrowIcon } from "../icons/CreditCardArrowIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"
import { ToggleDarkMode } from "./ToggleDarkMode"
import { LinkButton } from "./LinkButton"
import { DashboardScreens } from "@/shared/types/dashboard.types"

interface HeaderMenuMobileProps {
  accounts: AccountBank[];
  updateScreen: (newScreen: DashboardScreens) => void
}

export const HeaderMenuMobile = ({ accounts, updateScreen }: HeaderMenuMobileProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const toggleDrawer = () => setOpenDrawer((prev) => !prev)
  const handleClick = (onClickCb: (newScreen: DashboardScreens) => void, newScreen: DashboardScreens) => {
    onClickCb(newScreen);
    toggleDrawer();
  }

  return (
    <>
      <Button onClick={toggleDrawer} color="dark">
        <RiMenuLine />
      </Button>
      <Drawer open={openDrawer} onClose={toggleDrawer}>
        <DrawerHeader title="Menu" />
        <DrawerItems>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <SidebarItems>
                    { accounts.length > 0 && (
                      <SidebarItemGroup>
                        <DropdownSelectAccount
                          cssClass="mt-10"
                        />
                      </SidebarItemGroup>
                    )}

                  <SidebarItemGroup>
                    <MenuMobileLink onClickCb={() => handleClick(updateScreen, 'overview')}>
                      <HomeIcon />
                      Panorama
                    </MenuMobileLink>
                    <MenuMobileLink onClickCb={() => handleClick(updateScreen,'accounts')}>
                      <CreditCardArrowIcon />
                      Cuentas
                    </MenuMobileLink>
                    <MenuMobileLink onClickCb={() => handleClick(updateScreen, 'transactions')}>
                      <AccountRecordsIcon />
                      Transacciones
                    </MenuMobileLink>
                  </SidebarItemGroup>

                  <SidebarItemGroup>
                    <ToggleDarkMode cssClass="w-full my-5" />
                    <LinkButton text="Cerrar sesión" type="darkRed" className="w-full" href="/api/auth/sign-out" />
                  </SidebarItemGroup>
                </SidebarItems>
              </div>
            </div>
          </Sidebar>
        </DrawerItems>
      </Drawer>
    </>
  )
}