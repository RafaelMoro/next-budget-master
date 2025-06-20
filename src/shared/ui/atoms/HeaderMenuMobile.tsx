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
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <SidebarItems>
                    { accounts.length > 0 && (
                      <SidebarItemGroup>
                        <DropdownSelectAccount
                          accounts={accounts}
                          cssClass="mt-10"
                        />
                      </SidebarItemGroup>
                    )}

                  <SidebarItemGroup>
                    <MenuMobileLink href="#" >
                      <HomeIcon />
                      Panorama
                    </MenuMobileLink>
                    <MenuMobileLink href="#" >
                      <CreditCardArrowIcon />
                      Cuentas
                    </MenuMobileLink>
                    <MenuMobileLink href="#" >
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