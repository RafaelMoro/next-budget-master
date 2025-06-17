"use client"
import { useEffect, useMemo, useState } from "react";
import { Button, Dropdown, DropdownItem } from "flowbite-react"
import { RiArrowDownSLine } from "@remixicon/react"
import { ACCOUNT_PROVIDERS, AccountProvider } from "@/shared/types/accounts.types";

interface AccountProviderDropdownProps {
  provider?: AccountProvider;
}

export const AccountProviderDropdown = ({ provider }: AccountProviderDropdownProps) => {
  const typeProviders = useMemo(() => [...ACCOUNT_PROVIDERS], []);
  const [selectedProvider, setSelectedProvider] = useState<AccountProvider>(provider ?? 'mastercard')
  const [filteredProviders, setFilteredAccountTypes] = useState<AccountProvider[]>(typeProviders)

  useEffect(() => {
      if (provider) {
        const newFilteredProviders = typeProviders.filter(prov => prov !== provider)
        setFilteredAccountTypes(newFilteredProviders)
      }
    }, [provider, typeProviders])

  const handleSelectAccountType = (newAccProvider: AccountProvider) => {
    setSelectedProvider(newAccProvider)
    const fileteredTypes = typeProviders.filter(prov => prov !== newAccProvider)
    setFilteredAccountTypes(fileteredTypes)
  }

  return (
    <Dropdown label="" renderTrigger={() => (
      <Button color="dark">
        Tipo de cuenta: {selectedProvider}
        <RiArrowDownSLine />
      </Button>
    )}>
      { filteredProviders.map((prov, index) => (
        <DropdownItem
          onClick={() => handleSelectAccountType(prov)}
          value={prov}
          key={`${prov}-${index}`}
        >{prov}</DropdownItem>
      ))}
    </Dropdown>
  )
}