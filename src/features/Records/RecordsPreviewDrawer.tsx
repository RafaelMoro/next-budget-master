"use client"

import { BankMovement } from "@/shared/types/records.types";
import { RiDeleteBinFill, RiPencilLine } from "@remixicon/react";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import clsx from "clsx"

interface RecordsPreviewDrawerProps {
  record: BankMovement | null;
  open: boolean;
  handleClose: () => void;
}

export const RecordsPreviewDrawer = ({ open, handleClose, record }: RecordsPreviewDrawerProps) => {
  if (!record) {
    return null;
  }
  const priceStyles = clsx(
    "text-xl font-semibold text-center",
    { "text-red-600": record.typeOfRecord === 'expense'},
    { "text-green-400": record.typeOfRecord === 'income' },
    { "text-blue-400": record.typeOfRecord === 'transfer' }
  )

  return (
    <Drawer open={open} onClose={handleClose} position="right">
      <DrawerHeader title={`${record.fullDate} ${record.formattedTime}`} />
      <DrawerItems>
        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-bold text-center">{record.shortName}</h4>
          <div className="flex justify-center gap-3">
            <button aria-label={`Edit record ${record.shortName}`}className="cursor-pointer mr-3">
              <RiPencilLine size={18}  />
            </button>
            <button aria-label={`Remove record ${record.shortName}`}className="cursor-pointer mr-3">
              <RiDeleteBinFill size={18} />
            </button>
          </div>
        </div>

        <div className="mt-10">
          <p className={priceStyles}>{record.amountFormatted}</p>
        </div>
      </DrawerItems>
    </Drawer>
  )
}