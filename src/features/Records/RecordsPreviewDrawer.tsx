"use client"

import { RiCloseFill, RiDeleteBinFill, RiPencilLine } from "@remixicon/react";
import { Badge, Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import clsx from "clsx"

import { BankMovement, TypeOfRecord } from "@/shared/types/records.types";
import { categoryIcons } from "@/shared/constants/categories.constants";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { ChartLineIcon } from "@/shared/ui/icons/ChartLineIcon";

interface RecordsPreviewDrawerProps {
  record: BankMovement | null;
  open: boolean;
  handleClose: () => void;
}

export const RecordsPreviewDrawer = ({ open, handleClose, record }: RecordsPreviewDrawerProps) => {
  const { isMobile } = useMediaQuery()

  const Icon = categoryIcons[record?.category?.icon ?? 'newCategory']
  const typeRecordDict: Record<TypeOfRecord, string> = {
    expense: 'Gasto',
    income: 'Ingreso',
    transfer: 'Transferencia'
  }

  const priceStyles = clsx(
    "text-xl font-semibold text-center",
    { "text-red-600": record?.typeOfRecord === 'expense'},
    { "text-green-400": record?.typeOfRecord === 'income' },
    { "text-blue-400": record?.typeOfRecord === 'transfer' }
  )
  const badgeColorDict: Record<TypeOfRecord, string> = {
      expense: 'red',
      income: 'purple',
      transfer: 'info'
    }
  const drawerDirection = isMobile ? 'bottom' : 'right'
  
  if (!record) {
    return null;
  }

  return (
    <Drawer open={open} onClose={handleClose} position={drawerDirection}>
      <header className="grid grid-rows-2 grid-record-preview gap-x-2">
        <ChartLineIcon className="row-span-2 place-self-center" />
        <h4 className="text-gray-600 dark:text-gray-400 col-start-2 col-end-3 row-start-1 row-end-2">Detalles de la transacción</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 col-start-2 col-end-3 row-start-2 row-end-3">{typeRecordDict[record.typeOfRecord]}</p>
        <button className="text-gray-600 dark:text-gray-400 place-self-center cursor-pointer" onClick={handleClose}>
          <RiCloseFill />
        </button>
      </header>
      <DrawerItems>
        <div className="flex justify-center gap-3 mb-8">
          <button aria-label={`Edit record ${record.shortName}`}className="cursor-pointer mr-3">
            <RiPencilLine size={18}  />
          </button>
          <button aria-label={`Remove record ${record.shortName}`}className="cursor-pointer mr-3">
            <RiDeleteBinFill size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-5">
          <h4 className="text-2xl font-bold text-center">{record.shortName}</h4>
          <div className="flex justify-center gap-2 text-sm text-gray-400">
            <Badge className="max-w-max" color={badgeColorDict[record.typeOfRecord]}>{typeRecordDict[record.typeOfRecord]}</Badge>
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