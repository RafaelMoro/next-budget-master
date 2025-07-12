"use client"

import { RiDeleteBinFill, RiPencilLine } from "@remixicon/react";
import { Badge, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import clsx from "clsx"

import { BankMovement } from "@/shared/types/records.types";
import { categoryIcons } from "@/shared/constants/categories.constants";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

interface RecordsPreviewDrawerProps {
  record: BankMovement | null;
  open: boolean;
  handleClose: () => void;
}

export const RecordsPreviewDrawer = ({ open, handleClose, record }: RecordsPreviewDrawerProps) => {
  const { isMobile } = useMediaQuery()

  const Icon = categoryIcons[record?.category?.icon ?? 'newCategory']
  const priceStyles = clsx(
    "text-xl font-semibold text-center",
    { "text-red-600": record?.typeOfRecord === 'expense'},
    { "text-green-400": record?.typeOfRecord === 'income' },
    { "text-blue-400": record?.typeOfRecord === 'transfer' }
  )
  const drawerDirection = isMobile ? 'bottom' : 'right'
  
  if (!record) {
    return null;
  }

  return (
    <Drawer open={open} onClose={handleClose} position={drawerDirection}>
      <DrawerHeader title={`${record.fullDate} ${record.formattedTime}`} />
      <DrawerItems>
        <div className="flex justify-center gap-3 mb-8">
          <button aria-label={`Edit record ${record.shortName}`}className="cursor-pointer mr-3">
            <RiPencilLine size={18}  />
          </button>
          <button aria-label={`Remove record ${record.shortName}`}className="cursor-pointer mr-3">
            <RiDeleteBinFill size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-2xl font-bold text-center">{record.shortName}</h4>
          <div className="flex justify-center gap-2 text-sm text-gray-400">
            <Icon />
            <p>{record.category?.categoryName} / {record.subCategory}</p>
          </div>
          <p className={priceStyles}>{record.amountFormatted}</p>
          <p className="text-sm text-gray-400">{record.description}</p>
        </div>

        { record?.linkedBudgets && record?.linkedBudgets.length > 0 && (
            <div className="flex flex-col gap-3 mt-8">
              <h5 className="text-center text-xl">Presupuestos:</h5>
              <div className="flex gap-2">
                { record.linkedBudgets.map((budget) => (
                  <Badge key={budget._id} className="max-w-max" color="warning">
                    {budget.description}
                  </Badge>
                )) }
              </div>
            </div>
          ) }

          { record.tag.length > 0 && (
            <div className="flex flex-col gap-3 mt-8">
              <h5 className="text-center text-xl">Etiquetas:</h5>
              <div className="flex gap-2">
                { record.tag.map((t) => (
                  <Badge key={t} className="max-w-max" color="purple">
                    {t}
                  </Badge>
                )) }
              </div>
            </div>
          ) }
      </DrawerItems>
    </Drawer>
  )
}