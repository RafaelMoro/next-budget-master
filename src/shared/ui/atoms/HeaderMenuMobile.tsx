"use client"

import { Button, Drawer, DrawerHeader, DrawerItems, Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react"
import { RiMenuLine } from "@remixicon/react"
import { useState } from "react"
import { HomeIcon } from "../icons/HomeIcon"
import { AccountBank } from "@/shared/types/accounts.types"
import { DropdownSelectAccount } from "@/features/Accounts/DropdownSelectAccount"
import { MenuMobileLink } from "./MenuMobileLink"
import { CreditCardIcon } from "../icons/CreditCardIcon"
import { AccountRecordsIcon } from "../icons/AccountRecordsIcon"
import { ToggleDarkMode } from "./ToggleDarkMode"

interface HeaderMenuMobileProps {
  accounts: AccountBank[];
}

export const HeaderMenuMobile = ({ accounts }: HeaderMenuMobileProps) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const toggleDrawer = () => setOpenDrawer((prev) => !prev)

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
            { accounts.length > 0 && (
              <DropdownSelectAccount
                accounts={accounts}
              />
            )}
            <ToggleDarkMode cssClass="w-full my-5" />
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <SidebarItems>
                  <SidebarItemGroup>
                    <MenuMobileLink href="#" >
                      <HomeIcon />
                      Panorama
                    </MenuMobileLink>
                    <MenuMobileLink href="#" >
                      <CreditCardIcon />
                      Cuentas
                    </MenuMobileLink>
                    <MenuMobileLink href="#" >
                      <AccountRecordsIcon />
                      Transacciones
                    </MenuMobileLink>
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