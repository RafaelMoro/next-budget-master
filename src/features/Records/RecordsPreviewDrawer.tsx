"use client"

import { BankMovement } from "@/shared/types/records.types";
import { RiDeleteBinFill, RiPencilLine } from "@remixicon/react";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";

interface RecordsPreviewDrawerProps {
  record: BankMovement | null;
  open: boolean;
  handleClose: () => void;
}

export const RecordsPreviewDrawer = ({ open, handleClose, record }: RecordsPreviewDrawerProps) => {
  if (!record) {
    return null;
  }

  return (
    <Drawer open={open} onClose={handleClose} position="right">
      <DrawerHeader title={`${record.fullDate} ${record.formattedTime}`} />
      <DrawerItems>
        <h4>{record.shortName}</h4>
        <div className="flex gap-3">
          <button aria-label={`Edit record ${record.shortName}`}className="cursor-pointer mr-3">
            <RiPencilLine />
          </button>
          <button aria-label={`Remove record ${record.shortName}`}className="cursor-pointer mr-3">
            <RiDeleteBinFill />
          </button>
        </div>
        <p>{record.amountFormatted}</p>
      </DrawerItems>
    </Drawer>
  )
}