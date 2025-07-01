"use client"
import { fetchRecordsCurrentMonth } from "@/shared/lib/dashboard.lib";
import { AccountsDisplay } from "@/shared/types/accounts.types";
import { saveAccountApi } from "@/shared/utils/user-info.utils";
import { useDashboardStore } from "@/zustand/provider/dashboard-store-provider";
import { Modal, ModalBody, ModalHeader } from "flowbite-react"
import { useEffect, useState } from "react";

interface SelectAccountProps {
  openModal: boolean;
  closeModal: () => void;
}

export const SelectAccountDialog = ({ openModal, closeModal }: SelectAccountProps) => {
  const { accountsDisplay, selectedAccountDisplay, updateSelectedAccountDisplay, updateRecords } = useDashboardStore(
      (state) => state
    )
    const [accountsOptions, setAccountsOptions] = useState<AccountsDisplay[]>([])
  
    useEffect(() => {
      if (selectedAccountDisplay) {
        const options = accountsDisplay
          .filter(acc => acc.accountId !== selectedAccountDisplay.accountId)
          .slice(0, 10)
        setAccountsOptions(options);
      }
    }, [accountsDisplay, selectedAccountDisplay])
  
    const handleSelectAccount = async (accountId: string) => {
      const selected = accountsOptions.find(acc => acc.accountId === accountId)
      if (!selected) {
        console.warn('Account not found in options:', accountId);
        return;
      }
      const newOptions = accountsDisplay.filter(acc => acc.accountId !== accountId)
      // Save the account selected into the cookie
      await saveAccountApi(selected.accountId)
      setAccountsOptions(newOptions)
      updateSelectedAccountDisplay(selected)
  
      // Fetch new records of the selected account
      const { records } = await fetchRecordsCurrentMonth({ accountId: selected.accountId });
      updateRecords(records);
      closeModal()
    }
  return (
    <Modal show={openModal} onClose={closeModal}>
      <ModalHeader>Seleccione su cuenta:</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          { accountsOptions.map((acc) => (
            <button
              className="p-4 flex flex-between cursor-crosshair"
              onClick={() => handleSelectAccount(acc.accountId)}
              key={acc.accountId}
            >
              {acc.name}
              {acc.amount}
            </button>
          )) }
        </div>
      </ModalBody>
    </Modal>
  )
}